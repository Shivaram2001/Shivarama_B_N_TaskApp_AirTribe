# Shivarama_B_N_TaskApp_AirTribe

GET /tasks: Retrieve all tasks.

GET /tasks?filter=true: Retrive a tasks that are complted (flag=true).

GET /tasks/sorted : retrive data in sorted form based on creation date

GET /tasks/:id: Retrive a single task by its ID.

GET /tasks/priority/:level : Retive task based on prioity

POST /tasks: Create a new task. and validation ---> ID cannot be duplicate i.e. ID must not be in already existing task

PUT /tasks/:id: Update an existing task by its ID. Validation ---> req.body.id and req.params.id must match..i.e. user cannot modify other tasks

DELETE /tasks/:id: Delete a task by its ID.

ALL /* : any random url taht is not present is responded with 404 error
