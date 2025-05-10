
const IBMLogo = ({ className = "" }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-label="IBM"
    >
      <path d="M0 0v32h32V0zm2 2h28v28H2zm9.5 5v1h9v-1zm0 2v1h9v-1zm-6 2v1h21v-1zm0 2v1h21v-1zm0 2v1h21v-1zm6 2v1h9v-1zm0 2v1h9v-1zm-6 2v1h21v-1zm0 2v1h21v-1zm0 2v1h21v-1z" />
    </svg>
  );
};

export default IBMLogo;
