export const Title = (props) => {
  return "Nama saya : " + props.name;
};

Title.defaultProps = {
  name: "None",
};
