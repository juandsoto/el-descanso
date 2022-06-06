import React from "react";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { IUsuario } from "../interfaces/Usuario";
import { useAuth } from "../context/auth/index";

const useUsuarios = () => {
  const [state, setState] = React.useState<Omit<IUsuario, "password">[]>();
  const { user } = useAuth();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${user.token}`,
  };

  const [{ data: usuarios, loading, error }] = useAxios<
    Omit<IUsuario, "password">[]
  >({
    url: "/userdetail/",
    headers,
  });

  const [
    { data: postResponse, loading: postLoading, error: postError },
    postUser,
  ] = useAxios<{ detail: string }, IUsuario>(
    {
      url: "/usercreate/",
      method: "POST",
    },
    { manual: true }
  );

  const [
    { data: patchResponse, loading: patchLoading, error: patchError },
    patchUser,
  ] = useAxios<{ detail: string }, Partial<IUsuario>>(
    {
      url: "/user/",
      method: "PATCH",
      headers,
    },
    { manual: true }
  );
  const [
    { data: deleteResponse, loading: deleteLoading, error: deleteError },
    deleteUser,
  ] = useAxios<{ detail: string }, Partial<IUsuario>>(
    {
      url: "/user/",
      method: "DELETE",
      headers,
    },
    { manual: true }
  );
  const createUser = (user: IUsuario) => {
    postUser({
      data: user,
    });
  };
  const updateUser = (user: Partial<IUsuario>) => {
    patchUser({
      data: user,
      url: `/user/${user.id}/`,
    });
  };
  const deleteUserById = (id: string) => {
    patchUser({
      url: `/user/${id}`,
    });
  };

  React.useEffect(() => {
    if (!usuarios?.length) return;
    setState(usuarios);
  }, [usuarios]);

  React.useEffect(() => {
    if (!postResponse) return;
    toast.success(postResponse.detail);
    setState(prev => [
      {
        id: "0",
        nombre: "hard",
        rol: "recepcionista",
        username: "hard",
        telefono: "123456789",
      },
      ...prev!,
    ]);
  }, [postResponse]);

  return {
    usuarios: state,
    createUser,
    updateUser,
    deleteUser: deleteUserById,
  };
};

export default useUsuarios;
