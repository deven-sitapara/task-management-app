import { useToasts } from "react-toast-notifications";

export default function Toaster({ type, content }) {
  const { addToast } = useToasts();

  if (type === "alert-error" || type === "alert-danger") {
    type = "error";
  } else if (type === "alert-warning") {
    type = "warning";
  } else if (type === "Toaster-info") {
    type = "info";
  } else if (type === "Toaster-success") {
    type = "success";
  }

  addToast(content, { appearance: type, autoDismiss: true });
}
