import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import {Paper, List, Container} from "@material-ui/core";
import './App.css';
import {call} from "./service/ApiService";

class App extends React.Component {
    constructor(props) { // 생성자에서 props를 넘겨받음.
        super(props);
        this.state = { // item 초기화
            items: [], // item 오브젝트에 접근
        };
    }

    componentDidMount() {
        call("/todo", "GET", null).then((response) =>
            this.setState({items: response.data})
        );
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) =>
            this.setState({items: response.data})
        );
    }

    delete = (item) => {
        call("/todo", "DELETE", item).then((response) =>
            this.setState({items: response.data})
        );
    }

    update = (item) => {
        call("/todo", "PUT", item).then((response) =>
            this.setState({items: response.data})
        );
    }

    render() {
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo
                            item={item}
                            key={item.id}
                            delete={this.delete}
                            update={this.update}
                        />
                    ))}
                </List>
            </Paper>
        );

        return (
            <div className={"App"}>
                <Container maxWidth={"md"}>
                    <AddTodo add={this.add}/>
                    <div className={"TodoList"}>{todoItems}</div>
                </Container>
            </div>
        );
    }

}

export default App;