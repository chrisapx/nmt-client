import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { dialog_operations } from "../components/utils/constansts/DialogOperations";

export function useAuthDialog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [operation, setOperation] = useState(dialog_operations.login);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const _dialogOpen = searchParams.get('_auth_dia') === 'open';
    const _op = searchParams.get('_op') || dialog_operations.login;

    if (_dialogOpen) {
      setOperation(_op);
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  }, [searchParams]);

  const handleClose = () => {
    setDialogOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('_auth_dia', 'closed');
    newParams.delete('_op');
    setSearchParams(newParams);
  };

  const openDialog = (op = dialog_operations.login, params = []) => {
    if (!Array.isArray(params)) {
      console.error("Params should be an array", params);
      return;
    }

    setDialogOpen(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('_auth_dia', 'open');
    newParams.set('_op', op);
    setOperation(op);

    params.forEach(({ key, value }) => {
      newParams.set(key, value);
    });

    setSearchParams(newParams);
  };

  return useMemo(() => ({ dialogOpen, operation, handleClose, openDialog }), [dialogOpen, operation]);
}