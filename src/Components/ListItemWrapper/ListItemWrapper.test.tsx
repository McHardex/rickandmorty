import { ListItemTextProps } from "@material-ui/core";
import { render } from "@testing-library/react";
import ListItemWrapper from "./index";

const listItemProps = {
  primary: "status",
  secondary: "alive",
  avatar: false,
};

const renderListItemWrapper = (props: ListItemTextProps) => {
  const screen = render(
    <ListItemWrapper {...props}>
      <div>icon</div>
    </ListItemWrapper>
  );

  return screen;
};

describe("ListItemWrapper", () => {
  test("renders list item props", () => {
    const screen = renderListItemWrapper(listItemProps);
    const primaryText = screen.getByText(/status/i);
    const secondaryText = screen.getByText(/alive/i);
    const avatar = screen.queryByTestId("show-avatar");
    const noAvatar = screen.queryByTestId("hide-avatar");
    expect(primaryText).toBeInTheDocument();
    expect(secondaryText).toBeInTheDocument();
    expect(noAvatar).toBeInTheDocument();
    expect(avatar).not.toBeInTheDocument();
  });

  test("renders avatar component", () => {
    const updatedProps = { ...listItemProps, avatar: true };
    const screen = renderListItemWrapper(updatedProps);
    const avatar = screen.queryByTestId("show-avatar");
    const noAvatar = screen.queryByTestId("hide-avatar");
    expect(noAvatar).not.toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });
});
