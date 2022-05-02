import { Box } from "@mui/material";

type ImageSliderProps = { images: string[] };

const ImageSlider = (props: ImageSliderProps): JSX.Element => {
  const { images } = props;
  return (
    <Box
      className="hide-scrollbar"
      sx={{
        height: "250px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "4px",
        overflowX: "scroll",
        margin: "10px 0",
        borderRadius: "20px",
        cursor: "grab",
      }}
    >
      {images.map(image => (
        <img
          key={image}
          src={image}
          alt={image}
          height="100%"
          style={{ borderRadius: "20px" }}
        />
      ))}
    </Box>
  );
};

export default ImageSlider;
