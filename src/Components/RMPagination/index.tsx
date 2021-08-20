import React from "react";
import Pagination, { PaginationProps } from "@material-ui/lab/Pagination";
import { Box } from "@material-ui/core";

const RMPagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const {
    color,
    count,
    hideNextButton,
    hidePrevButton,
    page,
    onChange,
    ...rest
  } = props;
  return (
    <Box mt="30px" mb="10px" display="flex" justifyContent="center">
      <Pagination
        color="secondary"
        count={count}
        hideNextButton={hideNextButton}
        hidePrevButton={hidePrevButton}
        page={page}
        onChange={onChange}
        {...rest}
      />
    </Box>
  );
};

export default RMPagination;
