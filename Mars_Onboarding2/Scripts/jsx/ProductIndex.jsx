/*ProductIndex*/

//Form for creating new product or editing existing product
var inputWidth = { width: "250px" };
var Form = React.createClass({
    componentDidMount: function () {
        $("#nameError").hide();
        $("#priceError").hide();
        $("#priceInput").val("00.00");
    },
    render: function () {
        return (
            <form id="productForm" className="ui form">
                <div className="field">
                    <label>Name</label>
                    <input id="nameInput" type="text" name="product-name" placeholder="Name" />
                    <div id="nameError" className="ui left pointing red label"></div>
                </div>
                <div className="field">
                    <label>Price</label>
                    <div className="ui labeled input" style={inputWidth}>
                        <div className="ui label">$</div>
                        <input id="priceInput" type="text" name="price" placeholder="Price" style={inputWidth} />
                    </div>
                    <div id="priceError" className="ui left pointing red label"></div>
                </div>
            </form>
        );
    }
});

//Modal containing create/edit form
var Modal = React.createClass({
    render: function () {
        return (
            <div id="productModalId" className="ui modal">
                <div className="actions">
                    <div className="ui basic right floated icon cancel button"><i className="timeswindow close outline icon"></i></div>
                </div>
                <div className="header">
                    Product Details
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

//Button to trigger modal for creating new store
var Button = React.createClass({
    showModal: function (e) {
        $('#productModalId').modal('setting', {
            detachable: false, closable: false,
            onApprove: function () {
                $("#nameError").hide();
                $("#priceError").hide();
                //get input from form 
                var nameValue = $("#nameInput").val();
                var priceValue = $("#priceInput").val();
                //validate input data
                var nameErrorMessage;
                var priceErrorMessage;
                var priceFormat = /^\d*(.\d{2})?$/;
                var nameIsValid = true;
                var priceIsValid = true;

                if (nameValue == "") {
                    nameIsValid = false;
                    nameErrorMessage = "Name is required. Please enter Product Name."
                }
                if (nameValue.length < 3) {
                    nameIsValid = false;
                    nameErrorMessage = "Name has to be at least 3 characters long."

                }

                if (priceValue == "") {
                    priceIsValid = false;
                    priceErrorMessage = "Price is required. Please enter Price Name."
                }

                if (!priceFormat.test(priceValue)) {
                    priceIsValid = false;
                    priceErrorMessage = "Please enter valid price (up to 2 decimal places)."

                }

                if (!nameIsValid) {
                    $("#nameError").html(nameErrorMessage);
                    $("#nameError").show();
                }

                if (!priceIsValid) {
                    $("#priceError").html(priceErrorMessage);
                    $("#priceError").show();
                }

                //post data
                if (nameIsValid && priceIsValid) {
                    var data = { Name: nameValue, Price: parseFloat(priceValue) };
                    $.post(
                        "../Products/Create",
                        data,
                        function () {
                            alert("Successfully Submitted.");
                            $("#productForm").form("submit");
                        });
                }
                return false;
            },
            onHide: function () {
                $("#productForm").form("submit");
            }
        }).modal('show');

    },
    render: function () {
        return (
            <div>
                <button className="ui blue button" onClick={(e) => this.showModal(e)}><i className="shopping cart icon"></i>Add New Product</button>
                <Modal ref="modal" />
            </div>
        );
    }
});

React.render(<Button />, document.getElementById('modalcontainer'));

//Modal for deleting store
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

//Row for table of products
var ProductGridRow = React.createClass({
    handleEdit: function () {
        //set input value to the row data seleted
        var productid = this.props.item.Id;
        $("#nameInput").val(this.props.item.Name);
        $("#priceInput").val(this.props.item.Price);

        $('#productModalId').modal('setting', {
            detachable: false, closable: false,
            onApprove: function () {
                $("#nameError").hide();
                $("#priceError").hide();
                //get input from form 
                var nameValue = $("#nameInput").val();
                var priceValue = $("#priceInput").val();
                //validate input data
                var nameErrorMessage;
                var priceErrorMessage;
                var priceFormat = /^\d*(.\d{2})?$/;
                var nameIsValid = true;
                var priceIsValid = true;

                if (nameValue == "") {
                    nameIsValid = false;
                    nameErrorMessage = "Name is required. Please enter Product Name."
                }
                if (nameValue.length < 3) {
                    nameIsValid = false;
                    nameErrorMessage = "Name has to be at least 3 characters long."

                }

                if (priceValue == "") {
                    priceIsValid = false;
                    priceErrorMessage = "Price is required. Please enter Price Name."
                }

                if (!priceFormat.test(priceValue)) {
                    priceIsValid = false;
                    priceErrorMessage = "Please enter valid price (up to 2 decimal places)."

                }

                if (!nameIsValid) {
                    $("#nameError").html(nameErrorMessage);
                    $("#nameError").show();
                }

                if (!priceIsValid) {
                    $("#priceError").html(priceErrorMessage);
                    $("#priceError").show();
                }
                //post data
                if (nameIsValid && priceIsValid) {
                    var data = { Id: productid, Name: nameValue, Price: parseFloat(priceValue) };
                    $.post(
                        "../Products/Edit",
                        data,
                        function () {
                            alert("Successfully Submitted.");
                            $("#productForm").form("submit");
                        });
                }
                return false;
            },
            onHide: function () {
                $("#productForm").form("submit");
            }
        }).modal('show');
    },
    handleDelete: function () {
        var id = this.props.item.Id;
        var name = this.props.item.Name;
        var price = parseFloat(this.props.item.Price);
        var deleteData = { Id: id, Name: name, Price: price };
        var deleteMessage = "Name: " + name + ", " + "Price: $" + price;
        $("#deleteParagraph").html(deleteMessage);
        $("#deleteModal").modal('setting', {
            detachable: false, closable: false,
            onApprove: function () {
                $.post(
                    "../Products/DeleteConfirmed",
                    deleteData,
                    function () {
                        alert("Successfully Deleted.");
                        location.reload();
                    }
                );
            }
        }).modal('show');
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.item.Id}</td>
                <td>{this.props.item.Name}</td>
                <td>${this.props.item.Price}</td>
                <td><button className="ui small yellow button" onClick={this.handleEdit}><i className="edit icon"></i>Edit</button></td>
                <td><button className="ui small red button" onClick={this.handleDelete}><i className="trash icon"></i>Delete</button></td>
            </tr>
        );
    }
});

//Table of products
var ProductGridTable = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
        $.get(this.props.dataUrl, function (data) {
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
                <ProductGridRow key={item.Id} item={item} />);
        });
        return (
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
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
ReactDOM.render(
    <ProductGridTable dataUrl="/Products/GetProducts" />,
    document.getElementById('productTable')
);
