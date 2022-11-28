<script lang="ts">
    import { insert } from "svelte/internal";
    import { Styles, Modal, ModalBody, ModalFooter, ModalHeader } from "sveltestrap";
    import TodoListTable from "./lib/todolist-table/TodoListTable.svelte";
    import { InsertTodoList, ResetTodoList } from "./services/TodoListService";

    let insertText : string = "";
    let formAddText : HTMLDivElement;
    let todoTable : TodoListTable;
    let isModalOpen : boolean = false;

    const onSubmitAddForm = (e : Event) => {
        formAddText.classList.toggle('error', insertText.length <= 0);
        if (insertText.length <= 0) {
            formAddText.querySelector('.error-add-todolist-content').textContent = "Must be filled";
            return;
        }
        else {
            formAddText.querySelector('.error-add-todolist-content').textContent = "";
            InsertTodoList(insertText);
            insertText = "";
        }
    }  
</script>
<style lang="scss">
    .main-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .form-add-todolist {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        button {
            width: 100%;
        }
    }

</style>

<div class="main-container">
    <h1 class="fw-bold">Welcome to Todo List</h1>

    <form class="form-add-todolist" on:submit|preventDefault|stopPropagation={onSubmitAddForm}>
        <div class="form-group" bind:this={formAddText}>
            <input type="text" name="add-todolist-content" placeholder="Content" bind:value={insertText}>
            <span class="error-text error-add-todolist-content"></span>
        </div>

        <button class="button button-primary" type="submit">Insert</button>
    </form>

    <TodoListTable bind:this={todoTable}></TodoListTable>

    <button class="button button-danger" on:click|preventDefault={ () => { isModalOpen = true } }>Reset Todo List</button>

    <Modal isOpen={ isModalOpen } fullscreen='sm'>
        <ModalHeader><span class="fw-bold">Reset all todo list</span></ModalHeader>
        <ModalBody>Are you sure to delete all your todo list?</ModalBody>
        <ModalFooter>
            <button class="button button-danger" on:click|preventDefault={ () => { ResetTodoList(); isModalOpen = false } }>Yes</button>
            <button class="button button-success" on:click|preventDefault={ () => { isModalOpen = false; } }>No</button>
        </ModalFooter>
    </Modal>

</div>