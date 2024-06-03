import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  idTarefa,
  tituloTarefa,
  descricaoTarefa,
  inicioTarefa,
  fimTarefa,
  statusTarefa,
  recursoTarefa
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5'),
  createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6'),
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);
    let tarefaParaEditar = tarefas.filter(obj => obj.idTarefa === id)[0];
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas(current => current.filter(tarefa => tarefa.idTarefa !== id));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Título</StyledTableCell>
                  <StyledTableCell align="right">Descrição</StyledTableCell>
                  <StyledTableCell align="right">Data de Início</StyledTableCell>
                  <StyledTableCell align="right">Data de Finalização</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell align="right">Recurso</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row, indice) => (
                  <StyledTableRow key={indice}>
                    <StyledTableCell component="th" scope="row">{row.idTarefa}</StyledTableCell>
                    <StyledTableCell>{row.tituloTarefa}</StyledTableCell>
                    <StyledTableCell align="right">{row.descricaoTarefa}</StyledTableCell>
                    <StyledTableCell align="right">{row.inicioTarefa}</StyledTableCell>
                    <StyledTableCell align="right">{row.fimTarefa}</StyledTableCell>
                    <StyledTableCell align="right">{row.statusTarefa}</StyledTableCell>
                    <StyledTableCell align="right">{row.recursoTarefa}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><DeleteIcon fontSize="small" /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>Nova Tarefa</Button>
          {/* <Button size="small" variant="outlined">Cancelar</Button> */}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default ListarTarefa;
