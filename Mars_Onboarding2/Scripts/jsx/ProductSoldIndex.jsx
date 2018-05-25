//Delete Modal
var DeleteModal = React.createClass({
    render: function () {
        return (
            <div id="deleteModal" className="ui basic modal">
                <div className="ui icon header">
                    <i className="trash alternate icon"></i>
                    Are you sure you want to delete this?
                </div>
                <div className="content">
                    <h4 id="deleteParagraph"></h4>
                </div>
                <div className="actions">
                    <div className="ui red basic cancel inverted button">
                        <i className="remove icon"></i>
                        No
                    </div>
                    <div className="ui green ok inverted button">
                        <i className="checkmark icon"></i>
                        Yes
                    </div>
                </div>
            </div>
        )
    }
});

React.render(<DeleteModal />, document.getElementById('deletemodalcontainer'));

//Dropdown for customers
var dropdownWidth = { width: "280px" };
var CustomerDropdown = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
        $.get("/Customers/GetCustomers", function (data) {
            if (this.isMounted()) {
                this.setState({
                    items: data
                });
            }
        }.bind(this));
    },
    render: function () {
        var rows = [];
        this.state.items.forEach(function (item) {
            rows.push(
                <div className="item" data-value={item.Id}>{item.Name}</div>);
        });
        return (
            <div id="customerDropdown" className="ui selection dropdown" style={dropdownWidth} >
                <input type="hidden" name="customer" />
                <i className="dropdown icon"></i>
                <div className="default text">Select Customer</div>
                <div className="menu">
                    {rows}
                </div>
            </div>

        );
    }
});
//Dropdown for products
var ProductDropdown = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
        $.get("/Products/GetProducts", function (data) {
            if (this.isMounted()) {
                this.setState({
                    items: data
                });
            }
        }.bind(this));
    },
    render: function () {
        var rows = [];
        this.state.items.forEach(function (item) {
            rows.push(
                <div className="item" data-value={item.Id}>{item.Name}</div>);
        });
        return (
            <div id="productDropdown" className="ui selection dropdown" style={dropdownWidth} >
                <input type="hidden" name="product" />
                <i className="dropdown icon"></i>
                <div className="default text">Select Product</div>
                <div className="menu">
                    {rows}
                </div>
            </div>

        );
    }
});
//Dropdown for stores
var StoreDropdown = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
        $.get("/Stores/GetStores", function (data) {
            if (this.isMounted()) {
                this.setState({
                    items: data
                });
            }
        }.bind(this));
    },
    render: function () {
        var rows = [];
        this.state.items.forEach(function (item) {
            rows.push(
                <div className="item" data-value={item.Id}>{item.Name}</div>);
        });
        return (
            <div id="storeDropdown" className="ui selection dropdown" style={dropdownWidth} >
                <input type="hidden" name="store" />
                <i className="dropdown icon"></i>
                <div className="default text">Select Store</div>
                <div className="menu">
                    {rows}
                </div>
            </div>

        );
    }
});

//Form for editing or creating sales
var Form = React.createClass({
    componentDidMount: function () {
        $("#dateError").hide();
        $("#customerError").hide();
        $("#productError").hide();
        $("#storeError").hide();
        $("#productDropdown").dropdown();
        $("#customerDropdown").dropdown();
        $("#storeDropdown").dropdown();
    },
    render: function () {
        return (
            <form id="salesForm" className="ui form">
                <div className="field">
                    <label>Date</label>
                    <input id="dateInput" type="date" name="date-sold" />
                    <div id="dateError" className="ui left pointing red label"></div>
                </div>
                <div className="field">
                    <label>Product</label>
                    <ProductDropdown />
                    <div id="productError" className="ui left pointing red label"></div>
                </div>
                <div className="field">
                    <label>Customer</label>
                    <CustomerDropdown />
                    <div id="customerError" className="ui left pointing red label"></div>
                </div>
                <div className="field">
                    <label>Store</label>
                    <StoreDropdown />
                    <div id="storeError" className="ui left pointing red label"></div>
                </div>

            </form>
        );
    }
});

//Modal Containing the form
var Modal = React.createClass({
    render: function () {
        return (
            <div id="salesModalId" className="ui modal">
                <div className="actions">
                    <div className="ui basic right floated icon cancel button"><i className="timeswindow close outline icon"></i></div>
                </div>
                <div className="header">
                    Sales Details
                </div>

                <div className="content">
                    <Form />
                </div>
                <div className="actions">
                    <div id="cancelbutton" className="ui red cancel button" ><i className="ban icon"></i>Cancel</div>
                    <div id="submitbutton" className="ui green approve button"><i className="check icon"></i>Submit</div>
                </div>
                <p><br /></p>
            </div>
        );
    }
});

//Button that triggers the modal to create new sale
var Button = React.createClass({
    showModal: function (e) {
        $('#salesModalId')
            .modal('setting', {
                detachable: false, closable: false,
                //callback function when submit button is clicked for sale creation
                onApprove: function () {
                    $("#dateError").hide();
                    $("#customerError").hide();
                    $("#productError").hide();
                    $("#storeError").hide();
                    //get input data from the form
                    var customerId = $("#customerDropdown").dropdown('get value');
                    var productId = $("#productDropdown").dropdown('get value');
                    var storeId = $("#storeDropdown").dropdown('get value');
                    var dateSold = $("#dateInput").val();
                    console.log(dateSold);
                    //Validate the data
                    var customerIdisValid = true;
                    var productIdisValid = true;
                    var storeIdisValid = true;
                    var dateSoldisValid = true;
                    var dateformat = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

                    var customerErrorMessage = "";
                    var productErrorMessage = "";
                    var storeErrorMessage = "";
                    var dateSoldErrorMessage = "";

                    if (dateSold == "") {
                        dateSoldisValid = false;
                        dateSoldErrorMessage = "Date is Required."
                    }

                    else if (!dateformat.test(dateSold)) {
                        dateSoldisValid = false;
                        dateSoldErrorMessage = "Please enter valid Date."
                    }

                    if (customerId == "") {
                        customerIdisValid = false;
                        customerErrorMessage = "Customer is Required."
                    }

                    if (productId == "") {
                        productIdisValid = false;
                        productErrorMessage = "Product is Required."
                    }

                    if (storeId == "") {
                        storeIdisValid = false;
                        storeErrorMessage = "Store is Required."
                    }

                    if (!customerIdisValid) {
                        $("#customerError").html(customerErrorMessage);
                        $("#customerError").show();
                    }

                    if (!productIdisValid) {
                        $("#productError").html(productErrorMessage);
                        $("#productError").show();
                    }
                    if (!storeIdisValid) {
                        $("#storeError").html(storeErrorMessage);
                        $("#storeError").show();
                    }

                    if (!dateSoldisValid) {
                        $("#dateError").html(dateSoldErrorMessage);
                        $("#dateError").show();
                    }
                    //Post data

                    if (customerIdisValid && productIdisValid && storeIdisValid && dateSoldisValid) {
                        var datesold_date = new Date(dateSold);
                        var customerId_int = parseInt(customerId);
                        var storeId_int = parseInt(storeId);
                        var productId_int = parseInt(productId);
                        var data = {
                            CustomerId: customerId_int,
                            ProductId: productId_int,
                            StoreId: storeId_int,
                            DateSold: datesold_date.toJSON()
                        }
                        $.post(
                            "/ProductSolds/Create",
                            data,
                            function () {
                                alert("Successfully Submitted.");
                                $("#salesForm").form("submit");
                            });

                    }
                    return false;
                },
                onHide: function () {
                    $("#salesForm").form("submit");
                }
            })
            .modal('show');
    },
    render: function () {
        return (
            <div>
                <button className="ui blue button" onClick={(e) => this.showModal(e)}><i className="dollar sign icon"></i>Add New Sale</button>
                <Modal ref="modal" />
            </div>
        );
    }
});
React.render(
    <Button />,
    document.getElementById('modalcontainer')
);
//Rows for table of sales
var SalesGridRow = React.createClass({
    handleDelete: function (id) {
        var customerId = this.props.item.CustomerId;
        var productId = this.props.item.ProductId;
        var storeId = this.props.item.StoreId;
        var dateSold = this.props.item.DateSold;
        var productSoldId = this.props.item.Id;
        var deleteData = { id: productSoldId };
        var deleteMessage = "Customer: " + this.props.item.CustomerName + ", " + " Product: " + this.props.item.ProductName
            + ", " + "Store: " + this.props.item.StoreName + ", " + "DateSold: " + dateSold;
        $("#deleteParagraph").html(deleteMessage);
        $("#deleteModal").modal('setting', {
            detachable: false, closable: false,
            onApprove: function () {
                $.post(
                    "/ProductSolds/DeleteConfirmed/" + id,
                    deleteData,
                    function () {
                        alert("Successfully Deleted.");
                        location.reload();
                    }
                );
            }
        }).modal('show');
    },
    handleEdit: function () {
        //set input value to the row data seleted
        var salesid = this.props.item.Id;
        var customerid = this.props.item.CustomerId;
        var productid = this.props.item.ProductId;
        var storeid = this.props.item.StoreId;
        var date = this.props.item.DateSold;
        var arr_date = date.split("/");


        var day = arr_date[0];
        var month = arr_date[1];
        var year = arr_date[2];

        var today = (year) + "-" + (month) + "-" + (day);

        $('#dateInput').val(today);

        $("#productDropdown").dropdown('set selected', productid);
        $("#customerDropdown").dropdown('set selected', customerid);
        $("#storeDropdown").dropdown('set selected', storeid);

        $('#salesModalId')
            .modal('setting', {
                detachable: false, closable: false,
                //callback function when submit button is clicked for sale creation
                onApprove: function () {
                    $("#dateError").hide();
                    $("#customerError").hide();
                    $("#productError").hide();
                    $("#storeError").hide();
                    //get input data from the form
                    var customerId = $("#customerDropdown").dropdown('get value');
                    var productId = $("#productDropdown").dropdown('get value');
                    var storeId = $("#storeDropdown").dropdown('get value');
                    var dateSold = $("#dateInput").val();
                    console.log(dateSold);
                    //Validate the data
                    var customerIdisValid = true;
                    var productIdisValid = true;
                    var storeIdisValid = true;
                    var dateSoldisValid = true;
                    var dateformat = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

                    var customerErrorMessage = "";
                    var productErrorMessage = "";
                    var storeErrorMessage = "";
                    var dateSoldErrorMessage = "";

                    if (dateSold == "") {
                        dateSoldisValid = false;
                        dateSoldErrorMessage = "Date is Required."
                    }

                    else if (!dateformat.test(dateSold)) {
                        dateSoldisValid = false;
                        dateSoldErrorMessage = "Please enter valid Date."
                    }

                    if (customerId == "") {
                        customerIdisValid = false;
                        customerErrorMessage = "Customer is Required."
                    }

                    if (productId == "") {
                        productIdisValid = false;
                        productErrorMessage = "Product is Required."
                    }

                    if (storeId == "") {
                        storeIdisValid = false;
                        storeErrorMessage = "Store is Required."
                    }

                    if (!customerIdisValid) {
                        $("#customerError").html(customerErrorMessage);
                        $("#customerError").show();
                    }

                    if (!productIdisValid) {
                        $("#productError").html(productErrorMessage);
                        $("#productError").show();
                    }
                    if (!storeIdisValid) {
                        $("#storeError").html(storeErrorMessage);
                        $("#storeError").show();
                    }

                    if (!dateSoldisValid) {
                        $("#dateError").html(dateSoldErrorMessage);
                        $("#dateError").show();
                    }
                    //Post data

                    if (customerIdisValid && productIdisValid && storeIdisValid && dateSoldisValid) {
                        var datesold_date = new Date(dateSold);
                        var customerId_int = parseInt(customerId);
                        var storeId_int = parseInt(storeId);
                        var productId_int = parseInt(productId);
                        var data = {
                            Id: salesid,
                            CustomerId: customerId_int,
                            ProductId: productId_int,
                            StoreId: storeId_int,
                            DateSold: datesold_date.toJSON()
                        }
                        $.post(
                            "/ProductSolds/Edit",
                            data,
                            function () {
                                alert("Successfully Submitted.");
                                $("#salesForm").form("submit");
                            });

                    }
                    return false;
                },
                onHide: function () {
                    $("#salesForm").form("submit");
                }
            })
            .modal('show');
        return false;
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.item.Id}</td>
                <td>{this.props.item.CustomerName}</td>
                <td>{this.props.item.ProductName}</td>
                <td>{this.props.item.StoreName}</td>
                <td>{this.props.item.DateSold}</td>
                <td><button className="ui small yellow button" onClick={this.handleEdit}><i className="edit icon"></i>Edit</button></td>
                <td><button className="ui small red button" onClick={(id) => this.handleDelete(this.props.item.Id)}><i className="trash icon"></i>Delete</button></td>
            </tr>
        );
    }
});

//Sales Table
var SalesGridTable = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
        $.get('/ProductSolds/GetSales', function (data) {
            if (this.isMounted()) {
                this.setState({
                    items: data
                });
            }
        }.bind(this));
    },
    render: function () {
        var rows = [];
        this.state.items.forEach(function (item) {
            rows.push(
                <SalesGridRow key={item.Id} item={item} />);
        });
        return (
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>);
    }
});
React.render(
    <SalesGridTable dataUrl="/ProductSolds/GetSales" />,
    document.getElementById('salesTable')
);