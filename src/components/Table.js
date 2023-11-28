import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';

const BasicTable = ({ data, onPageSelect, onPerPageSelect, perPage, page }) => {
  return (
    <div>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={onPageSelect}
        rowsPerPage={perPage}
        onRowsPerPageChange={onPerPageSelect}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {[...new Array(31)].map((_val, key) => (
                <TableCell key={key}>{key + 1}</TableCell>
              ))}
              <TableCell>Year</TableCell>
              <TableCell>Month</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={`${row._id}`}>
                {Object.entries(row)
                  .filter(([key]) => key !== '_id')
                  .map(([key, val]) => (
                    <TableCell key={`${key}-row-cell`} align="right">
                      {val}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

BasicTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      [PropTypes.number]: PropTypes.number,
      year: PropTypes.number,
      month: PropTypes.number,
      _id: PropTypes.string,
    })
  ),
  perPage: PropTypes.number,
  onPerPageSelect: PropTypes.func,
  onPageSelect: PropTypes.func,
  page: PropTypes.number,
};

BasicTable.defaultProps = {
  data: [],
  onPerPageSelect: () => undefined,
  onPageSelect: () => undefined,
  perPage: 10,
};
export default BasicTable;
