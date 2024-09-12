import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';


export const MenuTable = (props) => {
  const {
    items = []
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Item
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  isAvailable
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((menu) => {
                return (
                  <TableRow
                    hover
                    key={menu.id}
                  >
                    <TableCell>
                      {menu.id}
                    </TableCell>
                    <TableCell>
                      {menu.item}
                    </TableCell>
                    <TableCell>
                      {menu.price}
                    </TableCell>
                    <TableCell>
                      {menu.isAvailableNow ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};


MenuTable.propTypes = {
  items: PropTypes.array
};
