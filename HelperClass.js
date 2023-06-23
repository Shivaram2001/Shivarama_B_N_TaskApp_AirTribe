class Helper{
    static ValidateBody(reqBody)
    {
        if(reqBody.title == undefined || reqBody.title =="")
        {
            return {
                success:false,
                message:"Title cannot be blank"
            }
        }
        if(reqBody.description == undefined || reqBody.description =="")
        {
            return {
                success:false,
                message:"Description cannot be blank"
            }
        }

        if(typeof(reqBody.flag) != "boolean" )
        {
            return {
                success:false,
                message:"flag must be a boolean"
            }
        }
    }

    static updateTasksJsonFile(updatedTasks){
        const fs=require("fs");
        const path=require("path");
        const writePath=path.join(__dirname,".","Data","data.json");
        fs.writeFileSync(writePath,JSON.stringify(updatedTasks),{encoding:"utf-8",flag:"w"});
    }
}

module.exports=Helper;