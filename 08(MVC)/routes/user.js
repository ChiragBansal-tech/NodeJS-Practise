const express = require('express')
const router = express.Router();
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUserById } = require('../controllers/user');


// router.get('/users', async (req, res) => {

//     const allDBUsers = await User.find({});
//     const html =`
//         <ul>
//             ${allDBUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//         </ul>
//     `;
//     res.send(html)
// })

router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUserById)

router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)



module.exports = router;
