import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const sample = {id:'',first_name:'John',last_name:'Smith',profession:"Fetchit",code:"F000",color:"Purple",city:"Mississauga",branch:"Abacus",assigned:false}

const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#eee',//theme.palette.text.secondary,
    alignSelf: 'center',
  },
}));

export default function Employee(props) {

  const classes = useStyles();

  const url = '/api/employees/';

  const [data, setData] = useState(props.data || sample);

  function onChange(e) {
    setData( prev => ({...prev, [e.target.name]:e.target.value}));
  }
  
 function onSwitch() {
    setData( prev => ({...prev, assigned: !prev.assigned}));
  }

  function onDone(e){
    e.preventDefault(); 
    window.location.reload();
  }

  async function onCreate(e){
    e.preventDefault();
    const employee = data;
    delete employee.id;
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data:employee})
      });
      const json = await result.json();
      setData(() => ({...json.data}));
    } catch(err) {      
      console.log(err);
    }
  }

  async function onUpdate(e){ 
    e.preventDefault();
    try {
      const result = await fetch(url+data.id,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: data}),
      });
      const json = await result.json();
      setData(() => ({...json.data}));
    } catch(err) {
      console.log(err);      
    }
  }

  async function onDelete(e){ 
    e.preventDefault();
    try {
      await fetch(url+data.id,{method:'DELETE'});
      window.location.reload();
    } catch(err) {
      console.log(err);
    }
  }

  function toLable(str) {
    return str.replace(/_/g, " ").replace(/(?:^|\s)\S/g,  (a) => a.toUpperCase());
  }

  return (
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid container spacing={1} direction='column'  alignContent='left'>
        <Grid item xs={12} alignItems='left' justify='left'>
          {data.id?'Employee: '+data.id:'New Employee'}
        </Grid>
        {
          Object.keys(data).map( (e,idx) => <>
              { e === 'id' || e === 'deleted_at' || e === 'updated_at' || e === 'created_at'
              ? <></>
              : 
              <Grid item xs={12} alignContent={e==='assigned'?'left':'left'}>              
                { e === 'assigned'
                ? <FormControlLabel 
                  alignSelf='left'             
                  label={toLable(e)}
                  control={
                    <Switch
                    alignSelf='left'       
                    id={e}
                    name={e}
                    checked={data.assigned}
                    onChange={onSwitch}
                  />}>                
                  </FormControlLabel>
                : <TextField
                    id={e}
                    name={e} 
                    defaultValue={Object.values(data)[idx]}
                    label={toLable(e)}
                    disabled={ e === 'code' || e === 'status' || e === 'updated_at' || e === 'created_at'}
                    onChange={onChange}
                    size='small'
                    variant="outlined"
                  />
                }
              </Grid>
              }
          </>)
        }
        <Grid item xs={12}>
          { data.id 
          ? <>
            <Button onClick={onUpdate} >Update</Button>
            <Button onClick={onDone} >Done</Button>
            <Button onClick={onDelete} >Delete</Button>
            </>
          : <>
            <Button onClick={onCreate} >Create</Button>
            <Button onClick={onDone} >Cancel</Button>
            </>
          }
        </Grid>
      </Grid>    
    </Paper>
    </div>
  )
}
