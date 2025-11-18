import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import {
  User
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import DeleteModal from "@/components/utilities/crud/delete";
import CustomModal from "@/components/utilities/modal/modal";
import { convertDateFormat } from "@/components/utilities/time-magic";
import {
  useGetUserQuery,
  useLazyDeleteUserQuery,
} from "../../../../../app/services/users/user.query";
import { UserI } from "../../../../../app/slices/branded/user/user.types";
import { useAppDispatch } from "../../../../../app/slices/hooks";
import { openDeleteModal } from "../../../../../app/slices/modal/modal.types";
import Loading from "../../../../utilities/styles/loading";

export function FetchUserForView() {
  const { userId } = useParams<{ userId: string }>();
  const { data: oneUser, isFetching, isLoading } = useGetUserQuery(userId!);

  return oneUser ? (
    <ViewUser userDetails={oneUser} />
  ) : isFetching || isLoading ? (
    <Loading fullscreen transparent />
  ) : (
    <></>
  );
}

export function ViewUser({ userDetails }: { userDetails: UserI }) {
  const [call, setCall] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [del] = useLazyDeleteUserQuery();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      if (call) {
        await del(id);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(`${error}`);
    } finally {
      setCall(false);
    }
  };

  return (
    <Grid container justifyContent="center" spacing={3} sx={{ mt: 4 }}>
      {
        <CustomModal
          children={
            <DeleteModal
              props={{
                id: userDetails.id,
                confirm: handleDelete,
                metadata: [`${userDetails.firstName} ${userDetails.lastName}`],
              }}
            />
          }
        />
      }
      <Grid item xs={12} md={10} lg={8}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: "12px",
            backgroundColor: "white",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <User className="text-blue-500 mr-2" size={32} />
              <Typography variant="h5" fontWeight="bold">
                User Details
              </Typography>
            </div>
            <NavLink to={`/user/${userDetails.id}/makeUserStaff`}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "medium",
                  borderRadius: "8px",
                }}
              >
                Make Staff
              </Button>
            </NavLink>
          </div>

          {/* User Details */}
          <Card
            elevation={1}
            sx={{
              borderRadius: "12px",
              mb: 4,
              p: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Name:</strong> {userDetails.firstName}{" "}
                    {userDetails.lastName}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {userDetails.email}
                  </Typography>
                  <Typography>
                    <strong>Username:</strong> {userDetails.username}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Created:</strong>{" "}
                    {
                    
                     
                     userDetails?.createdAt&& convertDateFormat(userDetails.createdAt)}
                  </Typography>
                  <Typography>
                    <strong>Last Login:</strong>{" "}
                    { userDetails?.lastLogin && convertDateFormat(userDetails.lastLogin)}
                  </Typography>
                  <Typography>
                    <strong>Auth Method:</strong>{" "}
                    {userDetails.auth0Id?.split("|")[0]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Chip
              label={`Role: ${userDetails.role}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`Subscription: ${userDetails.subscriptionStatus}`}
              color="secondary"
              variant="outlined"
            />
            <Chip
              label={`Email Verified: ${
                userDetails.isEmailVerified ? "Yes" : "No"
              }`}
              color={userDetails.isEmailVerified ? "success" : "error"}
              variant="outlined"
            />
            <Chip
              label={`2FA: ${
                userDetails.twoFactorAuth ? "Enabled" : "Disabled"
              }`}
              color={userDetails.twoFactorAuth ? "success" : "default"}
              variant="outlined"
            />
          </div>

          <Divider sx={{ mb: 4 }} />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <NavLink to={`/user/${userDetails.id}/edit`}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "medium",
                  borderRadius: "8px",
                }}
              >
                Edit
              </Button>
            </NavLink>
            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(openDeleteModal())}
              sx={{
                textTransform: "none",
                fontWeight: "medium",
                borderRadius: "8px",
              }}
            >
              Delete
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
