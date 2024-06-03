import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, Grid, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& label': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.text.secondary,
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: theme.palette.text.primary,
  },
}));

const CriarTarefa = ({ handleClose, tarefas, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState('');
  const [fimTarefa, setFimTarefa] = useState('');
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');

  useEffect(() => {
    let proximoId = Math.max(...tarefas.map(tarefa => tarefa.idTarefa)) + 1;
    setIdTarefa(proximoId);
  }, [tarefas]);

  const handleRecurso = (event) => {
    setRecursoTarefa(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusTarefa(event.target.value);
  };

  const handleSalvar = () => {
    console.log(`id: ${idTarefa} \n titulo: ${tituloTarefa} \n descrição: ${descricaoTarefa} \n inicio: ${inicioTarefa} \n fim: ${fimTarefa} \n recurso: ${recursoTarefa} \n status: ${statusTarefa}`);

    setTarefas([
      ...tarefas,
      {
        idTarefa,
        tituloTarefa,
        descricaoTarefa,
        inicioTarefa,
        fimTarefa,
        recursoTarefa,
        statusTarefa,
      },
    ]);
    handleClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={2}>
        <Card sx={style}>
          <CardHeader title="Tarefas" subheader="Cadastro de Tarefas" />
          <CardContent sx={{ width: '95%', maxWidth: '100%' }}>
            <Grid item xs={12}>
              <StyledFormControl fullWidth>
                <Input id="tarefa_titulo" aria-describedby="tarefa_titulo_helper_text" value={tituloTarefa} onChange={e => { setTituloTarefa(e.target.value); }} />
                <FormHelperText id="tarefa_titulo_helper_text">Título da Tarefa.</FormHelperText>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12}>
              <StyledFormControl fullWidth>
                <Input id="tarefa_descricao" aria-describedby="tarefa_descricao_helper_text" value={descricaoTarefa} onChange={e => { setDescricaoTarefa(e.target.value); }} />
                <FormHelperText id="tarefa_descricao_helper_text">Descrição da Tarefa.</FormHelperText>
              </StyledFormControl>
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={3}>
                <StyledFormControl>
                  <Input id="tarefa_inicio" type="date" aria-describedby="tarefa_inicio_helper_text" value={inicioTarefa} onChange={e => { setInicioTarefa(e.target.value); }}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 400,
                      paddingLeft: '13px',
                    }}
                  />
                  <FormHelperText id="tarefa_inicio_helper_text">Início da Tarefa.</FormHelperText>
                </StyledFormControl>
              </Grid>
              <Grid item xs={3}>
                <StyledFormControl>
                  <Input id="tarefa_fim" type="date" aria-describedby="tarefa_fim_helper_text" value={fimTarefa} onChange={e => { setFimTarefa(e.target.value); }}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 400,
                      paddingLeft: '13px',
                    }}
                  />
                  <FormHelperText id="tarefa_fim_helper_text">Fim da Tarefa.</FormHelperText>
                </StyledFormControl>
              </Grid>
              <Grid item xs={3}>
                <StyledFormControl fullWidth>
                  <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                  <Select
                    id="tarefa_recurso"
                    value={recursoTarefa}
                    label="Recurso"
                    onChange={handleRecurso}
                    size="small"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 400,
                    }}
                  >
                    <MenuItem value={'Recurso 1'}>Recurso 1</MenuItem>
                    <MenuItem value={'Recurso 2'}>Recurso 2</MenuItem>
                    <MenuItem value={'Recurso 3'}>Recurso 3</MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid item xs={3}>
                <StyledFormControl fullWidth>
                  <InputLabel htmlFor="tarefa_status">Status</InputLabel>
                  <Select
                    id="tarefa_status"
                    value={statusTarefa}
                    label="Status"
                    onChange={handleStatus}
                    size="small"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 400,
                    }}
                  >
                    <MenuItem value={'Aguardando'}>Aguardando</MenuItem>
                    <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                    <MenuItem value={'Concluída'}>Concluída</MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid container spacing={2} pl={2} mt={2}>
                <Grid item xs={1.5}>
                  <Button size="small" variant="contained" onClick={handleSalvar}>Salvar</Button>
                </Grid>
                <Grid item xs={1}>
                  <Button size="small" variant="outlined" onClick={handleClose}>Cancelar</Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  p: 4,
};

export default CriarTarefa;
