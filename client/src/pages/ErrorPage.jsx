const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="form-title font-poppins font-semibold">
        Your request could not be completed :&#40;
      </h2>
      <p>
        Go back, or press{" "}
        <a className="text-emerald-600" href="/">
          here
        </a>{" "}
        to return to the main menu.
      </p>
    </div>
  );
};

export default ErrorPage;
