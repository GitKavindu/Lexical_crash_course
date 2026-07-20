export const getSelectedBtnProps = (isSelected: boolean) => ({
  color: isSelected ? "primary" : "default",
  sx: isSelected
    ? {
        bgcolor: "primary.main",
        color: "primary.contrastText",
        "&:hover": {
          bgcolor: "primary.dark",
        },
      }
    : {
        color: "#444",
      },
});