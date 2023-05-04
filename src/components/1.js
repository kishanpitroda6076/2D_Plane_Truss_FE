import { Card,Text,Input,Button, Grid,Layout,Navbar } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function Page1({data,setData,nav,setNav}){
    const [eR,seteR] = useState({n:true,e:true})
    // const ChangeIt = ()=>{
    //     setNav((prevNav)=>({...prevNav,next : {...prevNav.next,active:(!eR.n && !eR.e)}}))
    //     return (<></>)
    // }

    const validate = ()=>{
        if(isNaN(data.n) || isNaN(data.e)) return;
        const n = parseInt(data.n)
        const e = parseInt(data.e)
        return (n > 2 && n < 26 && e>=n && e<=(2*n)-3)
    }

    useEffect(()=>{
        setNav((prevNav)=>({...prevNav,label:"Step 1",prev:{...prevNav.prev,show:false,active:false}}))
     },[])

    useEffect(()=>{
        setNav((prevNav)=>({...prevNav,next : {...prevNav.next,active:validate()}}))
    },[data])
    return (
        <>
      
        <div style={{overflow:'auto',height:'auto'}}>
<Grid.Container direction="row" style={{rowGap:'1vh',columnGap:'1vh'}}>

    <Grid xs={12}>
        <Card variant="bordered" css={{ mw: "400px" }} >
      <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Grid xs={12} style={{paddingTop:0,paddingBottom:0}}>
            
        <Text h4>Enter the Details</Text>
        </Grid>
        <Grid xs>
        <Input label="Nodes" type={'number'} onKeyUp={(e)=>{
            setData((prevData) => ({...prevData,n : parseInt(e.target.value)}))
            

        }} />
        </Grid>
        <Grid xs>
        <Input label="Elements" type={'number'} onKeyUp={(e)=>{
            setData((prevData) => ({...prevData,e : parseInt(e.target.value)}))
            
        }} />
        </Grid>
        </Grid.Container>
              
        {/* <Input placeholder="Disabled" onChange={()=>{
            document
        }} /> */}
      </Card.Body>
    </Card>
    </Grid>
    
    <Grid xs style={{paddingTop:8}}>
    {/* <Button size={'lg'} style={{width:"100%"}} disabled={} onClick={()=>{
            setData((prevData) => ({...prevData,curPage : 2}))
        }}>Next</Button> */}
    </Grid>
    </Grid.Container>
        {/* <ChangeIt /> */}
    </div>
    
    </>

    )
}