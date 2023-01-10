import { Box, Input, InputLabel, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation,  useQuery, useQueryClient } from "react-query";
import ScreenSkeleton from "../../../components/ScreenSkeleton";
import { useDebounce } from "../../../hooks/debounce";
import api from "../../../services/api";
import moment from "../../../utils/moment";

const defaultValues = {
  name: "",
  email: "",
  number: "",
  address: "",
  cpf: "",
};

export default function ListUser() {
  const queryClient = useQueryClient();

  const [modalUserOpen, setModalUserOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<String | Number | null>(
    null
  );
  const [anchorActionsMenuEl, setAnchorActionsMenuEl] = useState<Event | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const delayedSearchUser = useDebounce(search, 500);

  const { handleSubmit, reset, register, watch, control } = useForm({
    defaultValues,
  });

  const resetUser = () => setSelectedUser(null);

  const handleActionsMenuOpen = (
    { currentTarget }: { currentTarget: Event },
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

    setCount(count);

    return users;
  };

  const fetchUser = async ({ queryKey }: QueryFunctionContext) => {
    const idUser = queryKey[1];

    if (!idUser) return undefined;

    const response = await api.get(`/user/${idUser}`);

    return response.data;
  };

  const { data: users } = useQuery(
    ["users", delayedSearchUser, page, limit],
    fetchUsers,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: true,
      retryDelay: 1000 * 10,
    }
  );

  const {data: user} = useQuery(['user', selectedUser], fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
});

  const { mutate: submitSaveUser, isLoading } = useMutation(saveUser, {
    onSuccess: () => {
      queryClient.refetchQueries(["users"]);
    },
  });
  return(
    <ScreenSkeleton>
        <Box sx={{p: 3}}>
            <Box component="div">
                <Stack direction="row" justifyContent="space-between" mb={1}>
                    <TextField value={search} placeholder="Digite sua pesquisa..." onChange={({currentTarget}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearch(currentTarget.value)} />
                    
                </Stack>
            </Box>
        </Box>
    </ScreenSkeleton>
  )
}
