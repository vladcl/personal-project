import {
  Box,
  Button,
  Divider,
  Fab,
  Icon,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ScreenSkeleton from "../../components/ScreenSkeleton";
import { useDebounce } from "../../hooks/debounce";
import api from "../../services/api";
import moment from "../../utils/moment";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { Add, Cancel, Save } from "@mui/icons-material";
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "../../components/Modal";
import TablePaginator from "../../contexts/TablePaginator/tablepaginator";

const defaultValues = {
  name: "",
  email: "",
  number: "",
  address: "",
  cpf: "",
};


export default function ListUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [modalUserOpen, setModalUserOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<String | Number | null>(
    null
  );
  const [anchorActionsMenuEl, setAnchorActionsMenuEl] =
    useState<null | HTMLElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalDocument, setModalDocument] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState("");

  const delayedSearchUser = useDebounce(search, 500);

  const { handleSubmit, reset, register, watch, control } = useForm({
    defaultValues,
  });

  const actionsMenuOpen = Boolean(anchorActionsMenuEl);

  const resetUser = () => setSelectedUser(null);

  const handleActionsMenuOpen = (
    { currentTarget }: MouseEvent<HTMLButtonElement>,
    user: string | number | null
  ) => {
    setSelectedUser(user);
    setAnchorActionsMenuEl(currentTarget);
  };

  const handleActionsMenuClose = () => {
    setAnchorActionsMenuEl(null);
  };

  const handleModalUserOpen = async () => {
    if (user) {
      setAnchorActionsMenuEl(null);

      const { name, email, number, address, cpf } = user;

      reset({ name, email, number, address, cpf });
    }
    setModalUserOpen(true);
  };

  const handleModalUserClose = () => {
    setModalUserOpen(false);
    resetUser();
    reset(defaultValues);
  };

  const handleModalDeleteClose = () => {
    setConfirmDelete(false);
  };

  const handleModalDeleteOpen = () => {
    handleActionsMenuClose();
    setConfirmDelete(true);
  };

  const formatDateTime = (date: Date) =>
    date && moment(date).format("DD/MM/YYYY HH:mm");

  const saveUser = async (data: Object) => {
    try {
      let response;
      if (selectedUser) {
        response = await api.patch(`/user/${selectedUser}`);
      } else {
        response = await api.post("/user", data);

        reset(defaultValues);
      }
      setRefresh(!refresh)

      return response.data.message;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async ({ queryKey }: QueryFunctionContext) => {
    const search = queryKey[1];
    const page = queryKey[2];
    const limit = queryKey[3];

    const response = await api.get("/user", {
      params: {
        search,
        page: Number(page) + 1,
        limit,
      },
    });

    const { docs: users, totalDocs: count } = response.data;

    setCount(count || 0);

    return users;
  };

  const fetchUser = async ({ queryKey }: QueryFunctionContext) => {
    const idUser = queryKey[1];

    if (!idUser) return undefined;

    const response = await api.get(`/user/${idUser}`);

    return response.data;
  };

  const { data: users } = useQuery(
    ["users", delayedSearchUser, page, limit, refresh],
    fetchUsers,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: true,
      retryDelay: 1000 * 10,
    }
  );

  const { data: user } = useQuery(["user", selectedUser], fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const Paginator = () => (
    <TablePaginator
      count={count}
      page={page}
      rowsPerPage={limit}
      rowsPerPageOptions={[5, 10, 25, 100]}
      onPageChange={(_, page) => setPage(page)}
      onRowsPerPageChange={({ target }) => setLimit(Number(target.value))}
    />
  );
  return (
    <ScreenSkeleton>
      <Box sx={{ p: 3 }}>
        <Box component="div">
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <TextField
              value={search}
              placeholder="Digite sua pesquisa..."
              sx={{backgroundColor: '#FFF'}}
              onChange={({
                currentTarget,
              }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setSearch(currentTarget.value)
              }
            />
            <Paginator />
          </Stack>
          <TableContainer component={Paper} elevation={5}>
            <Table size="small">
              <TableHead>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Whatsapp</TableCell>
                <TableCell align="center">Endereço</TableCell>
                <TableCell align="center">CPF</TableCell>
                <TableCell align="center">Data de ediação</TableCell>
                <TableCell align="center">Data de edição</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableHead>
              <TableBody>
                {users?.map(
                  (
                    user: {
                      _id: string;
                      name: string;
                      email: string;
                      number: string;
                      address: string;
                      cpf: string;
                      createdAt: Date;
                      updatedAt: Date;
                    },
                    index: string
                  ) => (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.number}</TableCell>
                      <TableCell align="center">{user.address}</TableCell>
                      <TableCell align="center">{user.cpf}</TableCell>
                      <TableCell align="center">
                        {formatDateTime(user.createdAt)}
                      </TableCell>
                      <TableCell align="center">
                        {formatDateTime(user.updatedAt)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(event) =>
                            handleActionsMenuOpen(event, user._id)
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Paginator />
        </Box>
      </Box>
      {user && (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(event: MouseEvent<HTMLElement>) => {
              setAnchorActionsMenuEl(event.currentTarget);
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorActionsMenuEl}
            open={actionsMenuOpen}
            onClose={handleActionsMenuClose}
          >
            <MenuItem component={Link} to={`$/editar/${user._id}`}>
              <ListItemIcon>
                <Icon fontSize="small">edit</Icon>
              </ListItemIcon>
              <ListItemText>Modificar</ListItemText>
              <Divider />
            </MenuItem>
            <MenuItem onClick={handleModalDeleteOpen} sx={{ color: red[600] }}>
              <ListItemIcon>
                <Icon fontSize="small" sx={{ color: red[600] }}>
                  delete
                </Icon>
              </ListItemIcon>
              <ListItemText>Remover</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
      <Modal maxWidth="xs" open={modalUserOpen} onClose={handleModalUserClose}>
        <ModalHeader onCloseButton={handleModalUserClose}>
          {!user ? "Cadastro de usuário" : "Edição de usuário"}
        </ModalHeader>
        <ModalContent>
          <form id="user-add" onSubmit={handleSubmit(saveUser, ()=>console.log('erro'))}>
            <InputLabel required sx={{ color: "black" }}>
              Nome
            </InputLabel>
            <TextField
              required
              size="small"
              sx={{ width: "100%" }}
              placeholder="Digite o nome"
              {...register("name")}
            />
            <InputLabel required sx={{ color: "black" }}>
              E-mail
            </InputLabel>
            <TextField
              required
              size="small"
              sx={{ width: "100%" }}
              placeholder="Digite o email"
              {...register("email")}
            />
            <InputLabel required sx={{ color: "black" }}>
              Numero
            </InputLabel>
            <TextField
              required
              size="small"
              sx={{ width: "100%" }}
              placeholder="Digite o número"
              {...register("number")}
            />
            <InputLabel required sx={{ color: "black" }}>
              Endereço
            </InputLabel>
            <TextField
              required
              size="small"
              sx={{ width: "100%" }}
              placeholder="Digite o endereço"
              {...register("address")}
            />
            <InputLabel required sx={{ color: "black" }}>
              CPF
            </InputLabel>
            <TextField
              required
              size="small"
              sx={{ width: "100%" }}
              placeholder="Digite o cpf"
              {...register("cpf")}
            />
          </form>
        </ModalContent>
        <ModalActions>
          <Button
            color="error"
            variant="contained"
            form="user-add"
            onClick={handleModalUserClose}
            endIcon={<Cancel />}
          >
            Cancelar
          </Button>
          <Button
            color="success"
            variant="contained"
            form="user-add"
            type="submit"
            endIcon={<Save />}
          >
            Salvar
          </Button>
        </ModalActions>
      </Modal>
      <Box
        sx={{
          "& > :not(style)": {
            position: "fixed",
            bottom: 0,
            right: 0,
            margin: 3,
          },
        }}
      >
        <Fab onClick={handleModalUserOpen} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Box>
    </ScreenSkeleton>
  );
}
