import { Card,Text,Input,Button, Grid,Table,Radio,Dropdown } from "@nextui-org/react"
import { useState,useEffect } from "react"
import React from "react"

export default function Page5({data,setData,nav,setNav}){
    // const [eR,seteR] = useState({n:true,e:true})
    const [mat,setMat] = useState([[[[0]]]])
    const [load,setLoad] = useState(false)
    const Numberstyle = {
        "input::-webkit-outer-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input::-webkit-inner-spin-button":"{-webkit-appearance: none;margin: 0;}",
        "input[type=number]":"{-moz-appearance: textfield;}"   
    }
    
    const generation = ()=>{
        
    }


    const [selected, setSelected] = useState(Array(parseInt(data.sn)).fill('P'));
    const [nodesA, setNodesA] = useState(Array(parseInt(data.sn)).fill(0))
    const [nodesB, setNodesB] = useState(Array(parseInt(data.ln)).fill(0))
    const [force,setForce] = useState(Array.from({ length: parseInt(data.ln) }, () => Array.from({ length: 2 }, () => NaN)))
    

    useEffect(()=>{
        setLoad(true)
        generation()
        setData((prevData)=>({...prevData,sN:Array(parseInt(prevData.n)),ssN:Array(parseInt(data.sn)).fill('P')}))        
        setNav((prevNav)=>({...prevNav,label:"Step 5",prev:{...prevNav.prev,show:true,active:true},next:{...prevNav.next,label : "Next"}}))
     },[])


    const validate = () => {
        var t = data.llN
        var n = data.sN
        var l = data.lN
        var y = t.filter((v)=>isNaN(v[0]) || isNaN(v[1]))
        var st = new Set(n.concat(l))
        console.log(nodesA,(st.size == parseInt(data.n) && y.length == 0))
        return (st.size == parseInt(data.n) && y.length == 0)
        
    }
 
     useEffect(()=>{
        setNav((prevNav)=>({...prevNav,next : {...prevNav.next,active:validate()}}))
     },[data])

     useEffect(()=>{
        setData((prevData)=>({...prevData,sN:nodesA,ssN:selected,lN:nodesB,llN:force}))        
     },[selected,nodesA,nodesB,force])

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
    const genI = ()=>{
        var inputs = []
        for(let i=0;i<parseInt(data.sn);i++){
            inputs.push(
                <div key={"s5"+i} style={{display:'flex',flexDirection:'column',gap:'1vh',minWidth:'18vw'}}>
                    <Input type={"number"} placeholder="Node No" onKeyUp={(e)=>{
                        setNodesA(nodesA.map((v,j)=>
                        j==i ? parseInt(e.target.value) : v )) 
                    }} />
                    <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
        {selected[i]}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected[i]}
        onSelectionChange={(e)=>{
            setSelected(selected.map((v,j)=>
                j==i ? e.currentKey : v
            ))
        }}
      >
        <Dropdown.Item key="P">PIN</Dropdown.Item>
        <Dropdown.Item key="H">Horizonal Restrained</Dropdown.Item>
        <Dropdown.Item key="V">Vertical Restrained</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                </div>
            )
        }
        return inputs
    }

    const genII = ()=>{
        var inputs = []
        for(let i=0;i<parseInt(data.ln);i++){
            inputs.push(
                <div key={"s5"+i} style={{display:'flex',flexDirection:'column',gap:'1vh',minWidth:'24vw'}}>
                    <Input type={"number"} placeholder="Node No" onKeyUp={(e)=>{
                        setNodesB(nodesB.map((v,j)=>
                        j==i ? parseInt(e.target.value) : v ))
                    }} />

                    <Input type={"number"} labelLeft={<Text>F<sub>H</sub></Text>} placeholder="Horizontal Force" onKeyUp={(e)=>{
                        setForce(force.map((v,j)=>
                        j==i ? [parseInt(e.target.value),v[1]] : v ))
                    }} />

                    <Input type={"number"} labelLeft={<Text>F<sub>V</sub></Text>} placeholder="Vertical Force" onKeyUp={(e)=>{
                        setForce(force.map((v,j)=>
                        j==i ? [v[0],parseInt(e.target.value)] : v ))
                    }} />
                </div>
            )
        }
        return inputs
    }

    return (
        <div>
    <Grid.Container direction="row" style={{rowGap:'1vh',columnGap:'1vh'}}>
        <Grid xl={12} xs={12} style={{paddingTop:0}}>
        <Card variant="bordered">
      <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Enter Supported Nodes and Select Its Type</Text>
        </Grid>
        <Grid xs style={{alignItems:'center',columnGap:'1vh'}}>
            {genI()}
        </Grid>
        </Grid.Container>
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>
    <Grid xl={12} xs={12} style={{paddingTop:0}}>
        <Card variant="bordered">
      <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
        <Text h4>Enter Loaded Nodes and Its Force</Text>
        </Grid>
        <Grid xs style={{alignItems:'center',columnGap:'1vh'}}>
            {genII()}
        </Grid>
        </Grid.Container>
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>
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