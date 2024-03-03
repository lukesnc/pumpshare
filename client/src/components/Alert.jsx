import style from "../style"

const Alert = ({ message, type }) => {
  return (
    <div className={`alert-${type}`}>
      {message}
    </div>
  );
}

export default Alert;