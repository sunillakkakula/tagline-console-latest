import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getOrderDetailsById } from "../actions/orderAction";
// import StepperScreen from "./StepperScreen";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CustomBackdropSpinner from "./CustomBackdropSpinner";
import BackHomeNavigator from "./BackHomeNavigator";
import { OrderStatesDialog } from "./OrderStatesDialog";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
// import PropTypes from 'prop-types';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
import {
  Button,
  Paper,
  useMediaQuery,
  Grid,
  Typography,
  Icon,
  Card,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { DELIVERED, ORDER_CONFIRMED, ORDER_PACKED, ORDER_PLACED, OUT_FOR_DELIVERY, WAITING_FOR_PICKUP } from "../constants/orderConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    marginTop: "4em",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "2em",
    },
  },
  heroTextContainer: {
    minWidth: "21em",
    maxWidth: "50em",
    // marginLeft: "1em",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      maxWidth: "30em",
      marginTop: "1em",
    },
  },
  animation: {
    maxWidth: "50em",
    minWidth: "21em",
    // margin: "-5em",
    // marginBottom: "-5em",
    marginLeft: "1%",
    marginTop: "-6%",
    // marginBottom: "-6%",
    marginLeft: "1%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      maxWidth: "30em",
      marginTop: "1em",
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // whiteSpace: "nowrap",
    // marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  imageIcon: {
    height: "1rem",
  },
  iconRoot: {
    textAlign: "center",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleGreen: {
    color: "#26A541",
    marginTop: "0px",
    minHeight: "auto",
    fontFamily: "Roboto",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: "capitalize",
    textAlign: "left",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));

const OrderScreen = ({ match, history }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const orderStates = [ORDER_PLACED, ORDER_CONFIRMED, ORDER_PACKED, WAITING_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED];
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(orderStates[0]);

  const handleClickOpen = () => {
    console.log("Handle Updarte Status  : ")
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const orderId = match.params.id;

  const dispatch = useDispatch();

  const available_status = [ORDER_PLACED, ORDER_CONFIRMED, ORDER_PACKED, WAITING_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleCancelOrder = (id) => {
    console.log("Order Cancel by ID : " + id)
  }

  const handleOrderTracking = (id) => {
    console.log("Order Tracking by ID : " + id)
  }

  const handleUpdateStatus = (id) => {
    console.log("Handle Status Check  : " + id)
  }

  useEffect(() => {
    if (!userInfo) history.push("/login");

    if (orderId) dispatch(getOrderDetailsById(orderId));
  }, [dispatch, history, orderId, userInfo]);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log("Fetched Order by ID : " + orderId);
  console.log(order);
  return loading ? (
    <CustomBackdropSpinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <React.Fragment>
      <GridContainer>
        {/* BackHomeNavigator Section */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <BackHomeNavigator history={history} />
          </Card>
        </GridItem>
      </GridContainer>
      <Grid container direction="column" className={classes.mainContainer}>
        <Grid item>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="row"
          >
            <Grid sm item className={classes.heroTextContainer}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid conatiner>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h5">Thank you for placing Order # {orderId}</Typography>
                            <Divider />
                          </Grid>

                          <Grid item xs={12} container justify="flex-start" marginBottom="1rem">
                            <Typography variant="h5">Shipping Details</Typography>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    Name:
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>
                                      {order.user.name}</strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>Email: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>
                                      <a href={`mailto:${order.user.email}`}>
                                        {order.user.email}</a></strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>Address: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body2">
                                    <strong>
                                      {order.shippingAddress.address}</strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>City: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>
                                      {order.shippingAddress.city}</strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>Postal Code: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>
                                      {order.shippingAddress.postalCode}</strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid item xs={12} container justify="flex-start" marginBottom="1rem">
                        <Typography variant="h5">Order Details</Typography>
                      </Grid>
                      {order.orderItems.map((item, index) => (
                        <Grid item key={index}>
                          <Grid container>
                            <Grid item xs={3}>
                              <img
                                className="img-thumbnail"
                                src={item.imageUrl}
                                alt={item.name}
                                style={{
                                  height: "3.5rem",
                                  width: "3.5rem",
                                  marginRight: "5rem",
                                }}
                              />
                            </Grid>
                            <Grid item xs={9}>
                              <Grid container>
                                <Grid
                                  item
                                  xs={3}
                                  style={{
                                    justify: "center",
                                    alignContent: "center",
                                    marginRight: "5rem",
                                    marginTop: "1rem",
                                  }}
                                >
                                  <Typography variant="body1">
                                    {item.name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <Typography variant="body1">
                                    {item.quantityOrdered} X
                                    <Icon classes={{ root: classes.iconRoot }}>
                                      <img
                                        alt="curency inr"
                                        src={rupeeSvgIcon}
                                        className={classes.imageIcon}
                                      />
                                    </Icon>
                                    {item.totalPrice}=
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} align="right">
                                  <Typography variant="body1">
                                    <Icon classes={{ root: classes.iconRoot }}>
                                      <img
                                        alt="curency inr"
                                        src={rupeeSvgIcon}
                                        className={classes.imageIcon}
                                      />
                                    </Icon>

                                    {item.quantityOrdered * item.totalPrice}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}></Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} container justify="flex-start" marginBottom="1rem">
                            <Typography variant="h5">Payment Details</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              Payment Method
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              {order.paymentMethod}
                            </Typography>
                          </Grid>

                        </Grid>
                        <Divider />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid sm item className={classes.animation} >
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={12} container justify="flex-start" marginBottom="1rem">
                    <Typography variant="h5" justify="flex-start">Order Summary</Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container spacing={1} row justify="center">
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Items Cost</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.totalPrice - order.shippingPrice - order.taxPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Shipping Cost</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.shippingPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Tax</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.taxPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Total</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.totalPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">STATUS</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {selectedValue}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} flex>
                    <Grid container>
                      <Grid item xs={4}>
                        <Button
                          size="medium"
                          variant="contained"
                          color="primary"
                          type="submit"
                          justify="flex-start"
                          onClick={handleOrderTracking}
                          startIcon={<HourglassEmptyIcon />}
                        >
                          <Typography
                            variant="subtitle1"
                            color="white"
                            align="center"
                            style={{ color: "white" }}
                          >
                            Order
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          size="medium"
                          variant="contained"
                          color="primary"
                          type="submit"
                          justify="flex-start"
                          onClick={handleClickOpen}
                          // onClick={handleUpdateStatus}
                          startIcon={<EditIcon />}
                        >
                          <Typography
                            variant="subtitle1"
                            color="white"
                            align="center"
                            style={{ color: "white" }}
                          >
                            Status
                          </Typography>
                        </Button>
                        <OrderStatesDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
                      </Grid>

                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          variant="contained"
                          justify="flex-end"
                          onClick={handleCancelOrder}
                          startIcon={<DeleteIcon />}
                        >
                          <Typography
                            variant="subtitle1"
                            color="white"
                            align="center"
                            style={{ color: "white" }}
                          >
                            Cancel
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>

                  </Grid>

                  <Grid item xs={12}>
                    {error && <Message variant="danger">{error}</Message>}
                  </Grid>
                  <Divider />
                </Grid>
              </Paper>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderScreen;
