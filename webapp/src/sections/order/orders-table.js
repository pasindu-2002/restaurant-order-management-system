import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { constructMenuItems } from 'src/utils/menu-helper';


export const OrdersTable = (props) => {
  const {
    items = [],
    handleClick,
    open = false
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
                  Customer ID
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Items
                </TableCell>
                <TableCell>
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.id}
                    </TableCell>
                    <TableCell>
                      {order.customerId}
                    </TableCell>
                    <TableCell>
                      {order.date}
                    </TableCell>
                    <TableCell>
                      {constructMenuItems(order.itemIds)}
                    </TableCell>
                    <TableCell>
                      {order.totalPrice}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleClick(order.id)}>View</Button>
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


OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  handleClick: PropTypes.func,
  open: PropTypes.bool
};
