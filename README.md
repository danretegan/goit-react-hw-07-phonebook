# React homework template

## Backend

- `mockapi.io` service is used.
- The contacts resource is created to get the `/contacts` endpoint.

## Operations

- The `createAsyncThunk` function is used to declare asynchronous action generators and make HTTP requests. Processing actions and updating data in Redux state is done using `createSlice`.

- The following operations are declared:

    - `fetchContacts` - obtaining an array of contacts (GET method) by request. Action type `"contacts/fetchAll"`.
    - `addContact` - adding a contact (POST method). Action type `"contacts/addContact"`.
    - `deleteContact` - delete a contact (DELETE method). Action type `"contacts/deleteContact"`.
