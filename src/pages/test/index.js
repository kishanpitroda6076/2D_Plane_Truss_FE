import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button,Text,Container,Navbar,Input,Link,Grid} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { create, all, atan2 } from 'mathjs'
const math = create(all,  {})



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [nodes,setNodes] = useState([])
  const [edges,setEdges] = useState([])
  const [load,setLoad] = useState(false)
  useEffect(()=>{
    setLoad(true)
  })
  const genFig = ()=>{
    if(!load) return <></>
    const items = []
    var y=0
    const max = nodes.reduce((a, b) => Math.max(a, b), -Infinity);
    var mx = Array(2).fill(-Infinity)
    var mn = Array(2).fill(Infinity)
    var width = document.getElementById('draw').getBoundingClientRect().width
    var height = document.getElementById('draw').getBoundingClientRect().height
    for(var i=0;i<nodes.length;i++){
        mx[i%2] = Math.max(mx[i%2],nodes[i])
        mn[i%2] = Math.min(mn[i%2],nodes[i])
    }
    // console.log(width - 14)
    var f = Math.min((height-28)/mx[1],(width-28)/mx[0])
    if(f==Infinity) f=0
    var m = width/2 - (mx[0] - mn[0])*f/2
    console.log(m)
    for(var i=0;i<nodes.length;i+=2){
        items.unshift(<text x={m + nodes[i]*f} y={16 + nodes[i+1]*f} fontSize="10px" textAnchor="middle" stroke='white' alignmentBaseline='middle'>{y++}</text>)
        items.unshift(<circle cx={m + nodes[i]*f} cy={16 + nodes[i+1]*f} r="8" fill='black' />)
        items.unshift(<use href="#fixed" x={m + nodes[i]*f - 15} y={16 + nodes[i+1]*f + 5}></use>)
    }
    for(var i=0;i<edges.length;i+=2){
        var tx = (edges[i]-1)*2
        var ty = (edges[i+1]-1)*2
        const [x1,y1,x2,y2] = [m + nodes[tx]*f,16 + nodes[tx+1]*f,m + nodes[ty]*f,16 + nodes[ty+1]*f] 
        var slope = atan2((y2-y1),(x2-x1)) * (180/Math.PI)
        console.log(slope)
        if(slope < 0) slope+=180
        if(slope > 90 || slope < 0) slope+=180
        items.unshift(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke='black'><title>Works</title></line>)
        // items.push(<text rotate={slope} textAnchor='middle' alignmentBaseline='middle' x={(x1+x2)/2} y={(y1+y2)/2} stroke='black'>E</text>)
    }
    // items.push(<line x1={width/2} y1="0" x2={width/2} y2={height} strokeWidth="1" stroke='black' />)
    
    return items
  }
  const calculate = ()=>{
    const data = {"n":4,"e":4,"cord":[[0,0],[1,0],[0,1],[1,1]],"elem":[[1,2],[1,3],[2,4],[3,4]],"area":200,"modu":20000,"globalSM":[[4000000,0,-4000000,0,0,0,0,0],[0,4000000,0,0,0,-4000000,0,0],[-4000000,0,4000000,0,0,0,0,0],[0,0,0,4000000,0,0,0,-4000000],[0,0,0,0,4000000,0,-4000000,0],[0,-4000000,0,0,0,4000000,0,0],[0,0,0,0,-4000000,0,4000000,0],[0,0,0,-4000000,0,0,0,4000000]],"sn":2,"sN":[2,3],"ssN":["P","H"],"ln":2,"lN":[1,4],"llN":[[12,28],[24,10]],"curPage":5}
    // const data = {"n":4,"e":4,"cord":[[0,0],[30,0],[30,40],[0,40]],"elem":[[1,2],[2,3],[3,4],[2,4]],"area":1.5,"modu":30000000,"globalSM":[[1500000,0,-1500000,0,0,0,0,0],[0,0,0,0,0,0,0,0],[-1500000,0,1824000,-432000,0,0,-324000,432000],[0,0,-432000,1701000,0,-1125000,432000,-576000.0000000001],[0,0,0,0,1500000,0,-1500000,0],[0,0,0,-1125000,0,1125000,0,0],[0,0,-324000,432000,-1500000,0,1824000,-432000],[0,0,432000,-576000.0000000001,0,0,-432000,576000.0000000001]],"sn":3,"sN":[1,2,3],"ssN":["P","V","P"],"ln":1,"lN":[4],"llN":[[2000,0]],"curPage":5}
    
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
        return <>{e.toString()}</>
    }
    return <>{JSON.stringify(results)}</>

  }
  return (
    <>
      <Head>
        <title>Truss</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <div style={{boxSizing:"border-box"}}
    css={{
      maxW: "100%"
    }}
  >
      <Navbar variant={'sticky'} style={{boxShadow:'unset'}} >
      
        <Navbar.Brand style={{paddingLeft:13}}>
        <div style={{display:'flex',gap:'2vw',alignItems:'center'}}>
            
            <Text style={{fontSize:'2.75rem',fontWeight:'500'}}>Test</Text>
            </div>
        </Navbar.Brand>
      
</Navbar>
      <Container lg>
        {/* <Text>{JSON.stringify(data)}</Text> */}
        <Grid.Container>
            <Grid xs={2}>
        <Input type={'text'} onKeyUp={(e)=>{
            var arr = e.target.value.split(" ")
            if(arr.length > 0 && arr.length%2==0 && arr.filter((v)=>isNaN(v)).length == 0){
                setNodes(arr.map((v)=>parseInt(v)))
            }
        }} />
        </Grid>
        <Grid xs>
        <Input type={'text'} onKeyUp={(e)=>{
            var arr = e.target.value.split(" ")
            if(arr.length > 0 && arr.length%2==0 && arr.filter((v)=>isNaN(v)).length == 0){
                setEdges(arr.map((v)=>parseInt(v)))
            }
        }} />
        </Grid>
        <Grid xs={12}>
        <svg width={"100%"} id="draw" height="30vh">
        <symbol id="fixed" width="30" height="30">
    <polygon points="15,0.8 5,18 25,18" stroke="black" fill="none"/>
    <line x1="2" y1="18" x2="28" y2="18" stroke="black" />
    <line x1="5" y1="18" x2="3" y2="22" stroke="black" />
    <line x1="9" y1="18" x2="7" y2="22" stroke="black" />
    <line x1="13" y1="18" x2="11" y2="22" stroke="black" />
    <line x1="17" y1="18" x2="15" y2="22" stroke="black" />
    <line x1="21" y1="18" x2="19" y2="22" stroke="black" />
    <line x1="25" y1="18" x2="23" y2="22" stroke="black" />
    
  </symbol>
            {genFig()}
        </svg>
        </Grid>
        <Grid xs={12}>
            {calculate()}
        </Grid>
        </Grid.Container>
        </Container>
        </div>
    </>
  )
}
