import { Card,Text,Input,Button, Grid,Table } from "@nextui-org/react"
import { useState,useEffect } from "react"
import { create, all, atan2 } from 'mathjs'
const math = create(all,  {})


export default function Page6({data,setData,nav,setNav}){
    // const [eR,seteR] = useState({n:true,e:true})
    const [mat,setMat] = useState([[[[0]]]])
    const [load,setLoad] = useState(false)
    const Numberstyle = {
        "input::-webkit-outer-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input::-webkit-inner-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input[type=number]":"{-moz-appearance: textfield;}"   
    }
    
    const generation = ()=>{
        
    // var GSM = JSON.parse(JSON.stringify(data.globalSM))
    // var GSMC = JSON.parse(JSON.stringify(data.globalSM))
    // var dispmat = Array(data.n*2).fill(1)
    // var forcemat = Array(data.n*2).fill(0)
    // for(var i in data.sN){
    //     if(data.ssN[i]=="P" || data.ssN[i]=="H") dispmat[(data.sN[i]*2) - 2] = 0
    //     if(data.ssN[i]=="P" || data.ssN[i]=="V") dispmat[(data.sN[i]*2) - 1] = 0
    // }
    // for(var i in data.lN){
    //     [forcemat[(data.lN[i]*2)-2],forcemat[(data.lN[i]*2)-1]] = data.llN[i]
    // }
    // var rcdlist = []
    // for(var i=0;i<2*data.n;i++){
    //     if(dispmat[i]==0) rcdlist.push(i)
    // }

    // var [rdispmat,rforcemat] = [[...dispmat],[...forcemat]]

    // for(var i in rcdlist){
    //     GSM.splice(rcdlist[i]-i,1)
    //     GSM = GSM.map((v)=>{
    //         v.splice(rcdlist[i]-i,1)
    //         return v
    //     })
    //     rdispmat.splice(rcdlist[i]-i,1)
    //     rforcemat.splice(rcdlist[i]-i,1)
    // }

    // // var dispresult;
    // var results = {"Global Stiffness Matrix of the Truss":GSMC}
    // try{
    //    var dispresult = math.multiply(math.inv(GSM),rforcemat)
    //    var rin = 0
    //    for(var i=0;i<2*data.n;i++){
    //         if(dispmat[i]==1){
    //             dispmat[i] = dispresult[rin++]
    //         }
    //    }
    //    results["Displacement matrix of nodes"] = dispmat
    //    var forceresult = math.multiply(GSMC, dispmat)
    //    results["Force matrix of nodes"] = forceresult
    //    var newxco = []
    //    var newyco = []
    //    var snofel = [] 
    //     var enofel = [] 
    //     var lenofel = [] 
    //     var elcon = [] 
    //     var cosofel = [] 
    //     var sinofel = [] 
    //     var newlenofel = []
    //    var count = 0

    //     for(var i in data.cord){  
    //         var k = data.cord[i][0]+dispmat[count++]
    //         newxco.push(k)
    //         var l = data.cord[i][1]+dispmat[count++]
    //         newyco.push(l)
    //     }
    //     console.log(data.cord,newxco,newyco,dispmat)

    // for(var i in data.elem){  
    //     var a = parseInt(data.elem[i][0])
    //     var b = parseInt(data.elem[i][1])
    //     var x1 = parseFloat(data.cord[a-1][0])
    //     var y1 = parseFloat(data.cord[a-1][1])
    //     var x2 = parseFloat(data.cord[b-1][0])
    //     var y2 = parseFloat(data.cord[b-1][1])
    //     var l = parseFloat(Math.sqrt((x2-x1)**2+(y2-y1)**2))
    //     var con = parseFloat(data.area)*parseFloat(data.modu)/l
    //     var cos = (x2-x1)/l
    //     var sin = (y2-y1)/l
    //     snofel.push(a)
    //     enofel.push(b)
    //     lenofel.push(l)
    //     elcon.push(con)
    //     cosofel.push(cos)
    //     sinofel.push(sin)
    //     x1 = parseFloat(newxco[a-1])
    //     y1 = parseFloat(newyco[a-1])
    //     x2 = parseFloat(newxco[b-1])
    //     y2 = parseFloat(newyco[b-1])
    //     l = Math.sqrt((x2-x1)**2+(y2-y1)**2)
    //     newlenofel.push(l)
    // }
    // console.log(lenofel,newlenofel)
    // var elstrain = Array(data.e).fill(0)
    // var elstress = Array(data.e).fill(0)
    // var eforce = Array(data.e).fill(0)
    // for(var i in elstrain){
    //     elstrain[i] = (newlenofel[i]-lenofel[i])/(lenofel[i])
    //     elstress[i] = data.modu * elstrain[i]
    //     eforce[i] = data.area * elstress[i]
    // }
    // results= {...results,"Strain in the Elements":elstrain,"Stress in the elements":elstress,"Force in the elements":eforce}
    // }catch(e){
    //     return <>{e.toString()}</>
    // }
    // return <>{JSON.stringify(results)}</>
    

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
       var dispresult = math.multiply(math.inv(GSM),rforcemat)
       console.log(dispresult)
       var rin = 0
       for(var i=0;i<2*data.n;i++){
            if(dispmat[i]==1){
                dispmat[i] = dispresult[rin++]
            }
       }
       results["Displacement matrix of nodes"] = dispmat
       var forceresult = math.multiply(GSMC, dispmat)
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
        return [false,e]
    }
    
    return [true,results]
}

    useEffect(()=>{
        setLoad(true)
        setNav((prevNav)=>({...prevNav,label:"Results",prev:{...prevNav.prev,show:true,active:true},next:{...prevNav.next,label : "Next",active:false,show:false}}))
     },[])
 
     useEffect(()=>{
        
        // setNav((prevNav)=>({...prevNav,next : {...prevNav.next,active:validation()}}))
        setNav((prevNav)=>({...prevNav,next:{...prevNav.next,show:false}}))
     },[data])

    const draw = () => {
        if(!load) return <></>;
        var y=0;
        const cArr = data.cord
        const eArr = data.elem
        const items = []
        var mx = Array(2).fill(-Infinity)
        var mn = Array(2).fill(Infinity)
        var width = document.getElementById('draw').getBoundingClientRect().width
        var height = document.getElementById('draw').getBoundingClientRect().height
        var v = false
        for(var i=0;i<cArr.length;i++){
            if(isNaN(cArr[i][0]) || isNaN(cArr[i][1])) continue;
            mx = [Math.max(mx[0],cArr[i][0]),Math.max(mx[1],cArr[i][1])]
            mn = [Math.min(mn[0],cArr[i][0]),Math.min(mn[1],cArr[i][1])]
            v=true
        }
    // console.log(width - 14)
        if(v){
            var f = Math.min((height-28)/mx[1],(width-28)/mx[0])
            if(f==Infinity) f=0
            var m = width/2 - (mx[0] - mn[0])*f/2
            var tc = height - 16
            for(var i=0;i<cArr.length;i++){
                if(isNaN(cArr[i][0]) || isNaN(cArr[i][1])) continue;
                items.unshift(<text x={m + cArr[i][0]*f} y={tc - cArr[i][1]*f} fontSize="10px" textAnchor="middle" stroke='white' alignmentBaseline='middle'>{++y}</text>)
                items.unshift(<circle cx={m + cArr[i][0]*f} cy={tc - cArr[i][1]*f} r="8" fill='black' />)
            }
            for(var i of eArr){
                var from = cArr[i[0]-1]
                console.log(from)
                var to = cArr[i[1]-1]
                console.log(to)
                if(from==undefined || to==undefined || from[0]==null || from[0]==undefined || from[1]==null || from[1]==undefined 
                    || to[0]==null || to[0]==undefined || to[1]==null || to[1]==undefined) continue;
                // str+=`${from[0]*100} ${from[1]*100},${to[0]*100} ${to[1]*100},`
                items.unshift(<line key={"l1"+(++y)} x1={m + (from[0]*f)} y1={tc - (from[1]*f)} x2={m + (to[0]*f)} y2={tc - (to[1]*f)} stroke='black'/>)
                // str.push(<circle key={"c1"+y} cx={3 + (from[0]*f)} cy={3 + (from[1]*f)} r="2" stroke='black'/>)
                // str.push(<circle key={"c2"+y++} cx={3 + (to[0]*f)} cy={3 + (to[1]*f)} r="2" stroke='black' />)
            }
        // for(var i of cArr){
        //     if(i==undefined || i[0]==null || i[0]==undefined || i[1]==null || i[1]==undefined) continue;
        //     // str+=`${from[0]*100} ${from[1]*100},${to[0]*100} ${to[1]*100},`
        //     if(isNaN(i[0]) || isNaN(i[1])) continue; 
        //     str.push(<circle key={++y} cx={6 + (i[0]*f)} cy={6 + (i[1]*f)} r="2" stroke='black' strokeWidth="1"/>)
        // }
        }
        return items
    }
    const stifMat = () => {
        if(data.globalSM.length==0) return <></>
        return (<table style={{border:"1px solid black",borderCollapse:'collapse'}}>
            <tbody>
            {data.globalSM.map((v,i)=>{
                return (<tr key={i+1}>{v.map((v2)=>{
                    return(<td key={i*159} style={{border:"1px solid black",borderCollapse:'collapse',textAlign:'center',padding:2}}>{v2}</td>)
                })}</tr>) 
            })}
            </tbody>
            </table>)
    }
    const genFinal = ()=>{
        const [k,r] = generation()
        const items = [];
        if(!k) return <>${r}</>
        for(let [key,val] of Object.entries(r)){
            console.log(val)
            if(typeof val[0]=='object'){
                items.push(<Grid xl={12} xs={12} style={{paddingTop:0}}>
                    <Card variant="bordered">
                  <Card.Body>
                    <Grid.Container gap={2} justify="center">
                    <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
                    <Text h4>{key}</Text>
                    </Grid>
                    <Grid xs style={{alignItems:'center'}}>
                        <Text style={{fontFamily:'monospace'}}><table style={{border:"1px solid black",borderCollapse:'collapse'}}>
                <tbody>
                {val.map((v,i)=>{
                    return (<tr key={i+1}>{v.map((v2)=>{
                        return(<td key={i*159} style={{border:"1px solid black",borderCollapse:'collapse',textAlign:'center',padding:2}}>{v2}</td>)
                    })}</tr>) 
                })}
                </tbody>
                </table></Text>
        </Grid>
        </Grid.Container>
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>)
            }else{
                items.push(<Grid xl={12} xs={12} style={{paddingTop:0}}>
                    <Card variant="bordered">
                  <Card.Body>
                    <Grid.Container gap={2} justify="center">
                    <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
                    <Text h4>{key}</Text>
                    </Grid>
                    <Grid xs style={{alignItems:'center'}}>
                        <Text style={{fontFamily:'monospace'}}>
                        <table style={{border:"1px solid black",borderCollapse:'collapse'}}>
                <tbody>
                {val.map((v,i)=>{
                    return (<tr key={i+1}><td key={i*1596} style={{border:"1px solid black",borderCollapse:'collapse',textAlign:'center',padding:2}}>{v}</td></tr>) 
                })}
                </tbody>
                </table>
                            </Text></Grid>
        </Grid.Container>
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>)
            }
        }
        return items;
    }
    return (
        <div>
    <Grid.Container direction="row" style={{rowGap:'1vh',columnGap:'1vh'}}>
    {genFinal()}
    <Grid xs={12} xl>
        <Card variant="bordered">
            <Card.Body>
            <Grid.Container gap={2} justify="center">
            <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Shape Plot</Text>
        </Grid>
        <Grid xs={12}>

        <svg id='draw' width="100%" height="30vh">
            {draw()}
        </svg>
        </Grid>
        </Grid.Container>
            </Card.Body>
        </Card>
    </Grid>
    </Grid.Container>
    </div>
    )
}
