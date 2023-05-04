import { multiply, inv } from "mathjs"
export default function Generation(data){

    // const data = {"n":4,"e":4,"cord":[[0,0],[30,0],[30,40],[0,40]],"elem":[[1,2],[2,3],[3,4],[2,4]],"area":1.5,"modu":30000000,"globalSM":[[1500000,0,-1500000,0,0,0,0,0],[0,0,0,0,0,0,0,0],[-1500000,0,1824000,-432000,0,0,-324000,432000],[0,0,-432000,1701000,0,-1125000,432000,-576000.0000000001],[0,0,0,0,1500000,0,-1500000,0],[0,0,0,-1125000,0,1125000,0,0],[0,0,-324000,432000,-1500000,0,1824000,-432000],[0,0,432000,-576000.0000000001,0,0,-432000,576000.0000000001]],"sn":3,"sN":[1,2,3],"ssN":["P","V","P"],"ln":1,"lN":[4],"llN":[[2000,0]],"curPage":6}
        
    var GSM = JSON.parse(JSON.stringify(data.globalSM))
    var GSMC = JSON.parse(JSON.stringify(data.globalSM))
    var dispmat = Array(data.n*2).fill(1)
    var forcemat = Array(data.n*2).fill(0)
    for(var i in data.sN){
        if(data.ssN[i]=="P" || data.ssN[i]=="H") dispmat[(data.sN[i]*2) - 2] = 0
        if(data.ssN[i]=="P" || data.ssN[i]=="V") dispmat[(data.sN[i]*2) - 1] = 0
    }
    for(var i in data.lN){
        [forcemat[(data.lN[i]*2)-2],forcemat[(data.lN[i]*2)-1]] = data.llN[i]
    }
    var rcdlist = []
    for(var i=0;i<2*data.n;i++){
        if(dispmat[i]==0) rcdlist.push(i)
    }
    
    var [rdispmat,rforcemat] = [[...dispmat],[...forcemat]]
    
    for(var i in rcdlist){
        GSM.splice(rcdlist[i]-i,1)
        GSM = GSM.map((v)=>{
            v.splice(rcdlist[i]-i,1)
            return v
        })
        rdispmat.splice(rcdlist[i]-i,1)
        rforcemat.splice(rcdlist[i]-i,1)
    }
    
    // var dispresult;
    var results = {"Global Stiffness Matrix of the Truss":GSMC}
    try{
       var dispresult = multiply(inv(GSM),rforcemat)
       console.log(dispresult)
       var rin = 0
       for(var i=0;i<2*data.n;i++){
            if(dispmat[i]==1){
                dispmat[i] = dispresult[rin++]
            }
       }
       results["Displacement matrix of nodes"] = dispmat
       var forceresult = multiply(GSMC, dispmat)
       results["Force matrix of nodes"] = forceresult
       var newxco = []
       var newyco = []
       var snofel = [] 
        var enofel = [] 
        var lenofel = [] 
        var elcon = [] 
        var cosofel = [] 
        var sinofel = [] 
        var newlenofel = []
       var count = 0
    
        for(var i in data.cord){  
            var k = data.cord[i][0]+dispmat[count++]
            newxco.push(k)
            var l = data.cord[i][1]+dispmat[count++]
            newyco.push(l)
        }
        console.log(data.cord,newxco,newyco,dispmat)
    
    for(var i in data.elem){  
        var a = parseInt(data.elem[i][0])
        var b = parseInt(data.elem[i][1])
        var x1 = parseFloat(data.cord[a-1][0])
        var y1 = parseFloat(data.cord[a-1][1])
        var x2 = parseFloat(data.cord[b-1][0])
        var y2 = parseFloat(data.cord[b-1][1])
        var l = parseFloat(Math.sqrt((x2-x1)**2+(y2-y1)**2))
        var con = parseFloat(data.area)*parseFloat(data.modu)/l
        var cos = (x2-x1)/l
        var sin = (y2-y1)/l
        snofel.push(a)
        enofel.push(b)
        lenofel.push(l)
        elcon.push(con)
        cosofel.push(cos)
        sinofel.push(sin)
        x1 = parseFloat(newxco[a-1])
        y1 = parseFloat(newyco[a-1])
        x2 = parseFloat(newxco[b-1])
        y2 = parseFloat(newyco[b-1])
        l = Math.sqrt((x2-x1)**2+(y2-y1)**2)
        newlenofel.push(l)
    }
    console.log(lenofel,newlenofel)
    var elstrain = Array(data.e).fill(0)
    var elstress = Array(data.e).fill(0)
    var eforce = Array(data.e).fill(0)
    for(var i in elstrain){
        elstrain[i] = (newlenofel[i]-lenofel[i])/(lenofel[i])
        elstress[i] = data.modu * elstrain[i]
        eforce[i] = data.area * elstress[i]
    }
    results= {...results,"Strain in the Elements":elstrain,"Stress in the elements":elstress,"Force in the elements":eforce}
    }catch(e){
        return e.toString()
    }
    
    return JSON.stringify(results)
    
    }