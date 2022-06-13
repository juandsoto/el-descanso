import React from "react";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import IUsuario from "../interfaces/Usuario";
import { useAuth } from "../context/auth/index";
import { useAppContext } from "../context/index";

const useUsuarios = () => {
  const { user } = useAuth();
  const {
    backdrop: { openBackdrop, closeBackdrop },
  } = useAppContext();
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
    openBackdrop();
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
    if (!postResponse) return;
    closeBackdrop();
    toast.success(postResponse.detail);
  }, [postResponse]);

  React.useEffect(() => {
    if (!patchResponse) return;
    toast.success("Usuario actualizado con éxito!");
  }, [patchResponse]);

  React.useEffect(() => {
    if (!deleteResponse) return;
    toast.success("Usuario eliminado con éxito!");
  }, [deleteResponse]);

  return {
    usuarios,
    createUser,
    updateUser,
    deleteUser: deleteUserById,
  };
};

export default useUsuarios;
