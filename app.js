const express=require("express");
const fs=require("fs");
const path=require("path");
const app= express();
const tasks=require("./Data/data");
const Helper=require("./HelperClass");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/tasks", (req,res)=>{
   
    if(tasks.data.length==0)
    {
        return res.status(200).send({message:"No taks found",sucess:true});
    }
    if(req.query.filter=="true")
    {
        let data=tasks.data.filter((task)=>{
            return task.flag==true
        })
        res.status(200).send(data);
    }
    res.status(200).send({tasks})
});

app.get("/tasks/sorted",(req,res)=>{
    if(tasks.data.length==0)
    {
        return res.status(200).send({message:"No taks found",sucess:true});
    }

    let data=tasks.data.sort((a,b)=>{
        return a.creationDate-b.creationDate;
    })

    res.status(200).send(data);
})

app.get("/tasks/:id",(req,res)=>{
    let data=tasks.data.filter((ele)=>{
        return ele.id == req.params.id
    })
    if(data.length===0)
    {
        return res.status(400).send({
            sucess:false,
            message:"Invalid ID..Data Not Found"
        })
    }
    res.status(200).send(data)
});

app.get("/tasks/priority/:level",(req,res)=>{
    var data;
    if(req.params.level == "high")
    {
        data=tasks.data.filter((task)=>{
            return task.priority == "high"
        })
    }
    if(req.params.level == "medium")
    {
        data=tasks.data.filter((task)=>{
            return task.priority == "medium"
        })
    }   
    if(req.params.level == "low")
    {
        data=tasks.data.filter((task)=>{
            return task.priority == "low"
        })
        
    }
    res.status(200).send(data)
})



app.post("/tasks",(req,res)=>{

    let id=req.body.id;

    let idAlreadyexists=tasks.data.find((task)=>{
        return task.id == id
    });

    if(idAlreadyexists)
    {
        return res.status(400).send({
            sucess:false,
            message:"ID cannot be duplicate"
        })
    }

    let validation=Helper.ValidateBody(req.body);
    if(validation)
    {
        return res.status(400).send(validation);
    }
    req.body.creationDate=Date.now();
    let newTask=req.body;
    tasks.data.push(newTask);
    Helper.updateTasksJsonFile(tasks);
    res.status(200).send({
        sucess:true,
        message:"Task added sucessfully"
    })
})

app.put("/tasks/:id",(req,res)=>{
    if(req.body.id != req.params.id)
    {
        return res.status(400).send({
            sucess:false,
            message:"You cannot Update other task..Please make sure req.body.id and req.params.id match...Only for legends"
        })
    }
    
    var i;
    let isTaskPresent=tasks.data.find((task,index)=>{
        i=index
        return  task.id == req.params.id
    })
    console.log(i)
    if(!isTaskPresent)
    {
        return res.status(400).send(
            {
                sucess:false,
                message:"your Task Not Present"
            }
        )
    }

    req.body.creationDate=Date.now();
    tasks.data[i]=req.body;
    Helper.updateTasksJsonFile(tasks);
    
    res.status(200).send({
        sucess:true,
           message:"Task Updated sucessfully"
    })
})

app.delete("/tasks/:id",(req,res)=>{

    let isTaskPresent=tasks.data.find((task)=>{
        return  task.id == req.params.id
    })
    if(!isTaskPresent)
    {
        return res.status(400).send(
            {
                sucess:false,
                message:"your Task Not Present"
            }
        )
    }

    let newTasks=tasks.data.filter((task)=>{
        return task.id != req.params.id
    })

    let updatedTasks={data:newTasks}
    Helper.updateTasksJsonFile(updatedTasks);
    
    return res.status(200).send({
        success:true,
        message:"Your task has been deletd sucessfully"
    })
    
})

app.all("*",(req,res)=>{
    res.status(404).send({
        sucess:false,
        message:"Page not Found"
    })
})

app.listen(3000,()=>{
    console.log("Listening to port 3000....")
})
