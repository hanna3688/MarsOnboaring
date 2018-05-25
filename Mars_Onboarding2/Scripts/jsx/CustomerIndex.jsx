//Form for creating or editing customer
var Form = React.createClass({
    componentDidMount: function () {
        $("#nameError").hide();
    },
    render: function () {
        return (
            <form id="customerForm" className="ui form">
                <div className="field">
                    <label>Name</label>
                    <input id="nameInput" type="text" name="first-name" placeholder="Name" />
                    <div id="nameError" className="ui left pointing red label"></div>
                </div>
                <div className="field">
                    <label>Address</label>
                    <input id="addressInput" type="text" name="address" placeholder="Address" />
                </div>
            </form>
        );
    }
});

//Modal containing the edit/create form
var Modal = React.createClass({
    render: function () {
        return (
            <div id="customerModalId" className="ui modal">
                <div className="actions">
                    <div className="ui basic right floated icon cancel button"><i className="timeswindow close outline icon"></i></div>
                </div>
                <div className="header">
                    Customer Details
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

//Button to trigger create/edit modal
var Button = React.createClass({
    showModal: function (e) {
        $('#customerModalId').modal('setting', {
            detachable: false, closable: false,
            //when user click submit get input, validate and post
            onApprove: function () {
                //get input from form 
                var nameValue = $("#nameInput").val();
                var addressValue = $("#addressInput").val();
                //validate input data
                var errorMessage;
                if (nameValue == "") {
                    errorMessage = "Name is required. Please enter Customer Name."
                    $("#nameError").html(errorMessage);
                    $("#nameError").show();

                }
                else if (nameValue.length < 3) {
                    errorMessage = "Name has to be at least 3 characters long."
                    $("#nameError").html(errorMessage);
                    $("#nameError").show();
                }
                //post data
                else {
                    var data = { Name: nameValue, Address: addressValue };
                    $.post(
                        "../Customers/Create",
                        data,
                        function () {
                            alert("Successfully Submitted.");
                            $("#customerForm").form("submit");
                        });
                }
                return false;
            },
            onHide: function () {
                $("#customerForm").form("submit");
            }
        }).modal('show');

    },
    render: function () {
        return (
            <div>
                <button className="ui blue button" onClick={(e) => this.showModal(e)}><i className="user icon"></i>Add New Customer</button>
                <Modal id="testing " ref="modal" />
            </div>
        );
    }
});

React.render(<Button />, document.getElementById('modalcontainer'));

//Modal for deleting customer
var DeleteModal = React.createClass({
    render: function () {
        return (
            <div id="deleteModal" className="ui basic modal">
                <div className="ui icon header">
                    <i className="trash alternate icon"></i>
                    Are you sure you want to delete this?
                </div>
                <div className ="content">
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

//Rows for table of customers
var CustomerGridRow = React.createClass({
    handleEdit: function () {
        //set input value to the row data seleted
        var cid = this.props.item.Id;
        $("#nameInput").val(this.props.item.Name);
        $("#addressInput").val(this.props.item.Address);
        
        $('#customerModalId').modal('setting', {
            detachable: false, closable: false,
            onApprove: function () {
                //get input from form 
                var nameValue = $("#nameInput").val();
                var addressValue = $("#addressInput").val();
                //validate input data
                var errorMessage;
                if (nameValue == "") {
                    errorMessage = "Name is required. Please enter Customer Name."
                    $("#nameError").html(errorMessage);
                    $("#nameError").show();

                }
                else if (nameValue.length < 3) {
                    errorMessage = "Name has to be at least 3 characters long."
                    $("#nameError").html(errorMessage);
                    $("#nameError").show();
                }
                //post data
                else {
                    var data = { Id: cid, Name: nameValue, Address: addressValue };
                    $.post(
                        "../Customers/Edit",
                        data,
                        function () {
                            alert("Successfully Submitted.");
                            $("#customerForm").form("submit");
                        });
                }
                return false;
            },
            onHide: function () {
                $("#customerForm").form("submit");
            }
        }).modal('show');
    },
    handleDelete: function () {
        var id = this.props.item.Id;
        var name = this.props.item.Name;
        var address = this.props.item.Address;
        var deleteData = { Id: id, Name: name, Address: address };
        var deleteMessage = "Name: " + name + ", " + "Address: " + address;
        $("#deleteParagraph").html(deleteMessage);
        $("#deleteModal").modal('setting', {
            detachable: false, closable: false,
            onApprove: function () {
                $.post(
                    "../Customers/DeleteConfirmed",
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
                <td>{this.props.item.Address}</td>
                <td><button className="ui small yellow button" onClick={this.handleEdit}><i className="edit icon"></i>Edit</button></td>
                <td><button className="ui small red button" onClick={this.handleDelete}><i className="trash icon"></i>Delete</button></td>
            </tr>
        );
    }
});

//Table of customers
var CustomerGridTable = React.createClass({
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
                <CustomerGridRow key={item.Id} item={item} />);
        });
        return (
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
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
    <CustomerGridTable dataUrl="/Customers/GetCustomers" />,
    document.getElementById('customerTable')
);
