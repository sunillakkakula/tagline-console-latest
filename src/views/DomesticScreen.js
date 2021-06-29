import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import ProductConfigureForm from "./ProductConfigureForm";
import ProductConfigureTable from "./ProductConfigureTable";

class DomesticScreen extends Component {
  state = {
    data: [],
    editIdx: -1,
  };

  handleRemove = (i) => {
    this.setState((state) => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState((state) => ({
      data: state.data.map((row, j) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          spacing={1}
          style={{ top: "5%", transform: "translateY(+5%)" }}
        >
          <Grid item xs={12}>
            <Grid item>
              <ProductConfigureForm
                onSubmit={(submission) =>
                  this.setState({
                    data: [...this.state.data, submission],
                  })
                }
              />
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Grid>
        <ProductConfigureTable
          handleRemove={this.handleRemove}
          startEditing={this.startEditing}
          editIdx={this.state.editIdx}
          stopEditing={this.stopEditing}
          handleChange={this.handleChange}
          data={this.state.data}
          header={[
            {
              name: "Order Type",
              prop: "orderType",
            },
            {
              name: "Unit Of Messure",
              prop: "unitOfMessure",
            },

            {
              name: "Selling Price",
              prop: "sellingPrice",
            },
          ]}
        />
      </React.Fragment>
    );
  }
}

export default DomesticScreen;
