import { Router } from "express";
import {
  createSubTask,
  createTask,
  deleteTask,
  deleteSubTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
} from "../controllers/task.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createSubTaskValidator,
  createTaskValidator,
  updateSubTaskValidator,
  updateTaskValidator,
} from "../validators/index.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router({ mergeParams: true });

router.use(verifyJWT);

router
  .route("/")
  .get(validateProjectPermission(AvailableUserRole), getTasks)
  .post(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    upload.array("attachments", 5),
    createTaskValidator(),
    validate,
    createTask,
  );

router
  .route("/:taskId")
  .get(validateProjectPermission(AvailableUserRole), getTaskById)
  .put(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    upload.array("attachments", 5),
    updateTaskValidator(),
    validate,
    updateTask,
  )
  .delete(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    deleteTask,
  );

router
  .route("/:taskId/subtasks")
  .post(
    validateProjectPermission(AvailableUserRole),
    createSubTaskValidator(),
    validate,
    createSubTask,
  );

router
  .route("/:taskId/subtasks/:subTaskId")
  .put(
    validateProjectPermission(AvailableUserRole),
    updateSubTaskValidator(),
    validate,
    updateSubTask,
  )
  .delete(
    validateProjectPermission(AvailableUserRole),
    deleteSubTask,
  );

export default router;
