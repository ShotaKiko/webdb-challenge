const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const config = {
    client: "sqlite3",
    connection: {
      filename : './data/webdb_sprint.sqlite3'
    },
    useNullasDefault: true
};

const db = knex(config)

const server = express();
server.use(express.json());
server.use(helmet());

//~~~~~~~~~~~~~~~~~server~~~~~~~~~
const port = 6492;
server.listen(port, function() {
  console.log(`\n=== Webdb API Listening on http://localhost:${port} ===\n`);
});

//~~~~~~~~~~~~~~~~~~~~~helper functions~~~~~~
//SELECT * from projects
function findAll(){
    return db('projects')
}
  
  //select * from project where id = id
function findById(id){
    return (db('projects').where({ id }), db('actions').where( 'project_id', id))
}
  
function addProject(project) {
    return db('projects').insert(project)
}

function addAction(action) {
    return db('actions').insert(action)
}

//~~~~~~~~~~~~~~~~~~~ endpoints here~~~~~~~~~~~~~
    server.get('/api', (req, res) => {
    res.send(`
    <h2>
        WEBDB Sprint 
    </h2>`)
    })
  
  server.get('/api/projects', async (req, res) => {
    try{
        const projectList = await findAll();
        res.status(200).json(projectList)
    } catch (error) {
        res.status(500).json({
            message: 'The projects list could not be retrieved.'
        })
    }
  })

  server.get('/api/projects/:id', async (req, res) => {
      try{
          const project = await findById(req.params.id)
          res.status(200).json(project)
      } catch (error) {
          res.status(500).json({
              message:"The project could not be retrieved."
          })
      }
  })

  server.post('/api/projects', async (req, res) => {
    try{
        const newProject = req.body
        const addedProject = await addProject(newProject)
        res.status(201).json(addedProject)
    } catch (error){
        res.status(500).json({
            message:"The account could not be added to the database."
        })
    }
})

server.post('/api/projects/:id/actions', async (req, res) =>{
    const newAction = { ...req.body, project_id: req.params.id}
    try{
        const addedAction = await addAction(newAction);
        res.status(201).json(addedAction)
    } catch (error) {
        res.status(500).json({
            message: "The action could not be added."
        })
    }
})

