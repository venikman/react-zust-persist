
const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', marginTop: 'auto' }}>
      {import.meta.env.VITE_FOOTER_TEXT}
    </footer>
  );
};

export default Footer;
