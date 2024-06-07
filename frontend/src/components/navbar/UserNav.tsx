import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import { NavImages } from "@/constants";
import { addUser } from "@/redux/state";
import { AppDispatch, RootState } from "@/redux/store";
import axios from 'axios';
import { useEffect } from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { resetState } from "@/redux/state";


const UserNav = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const { mutate: signout, isError, isSuccess } = useSignOutAccount();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/api/auth/login/';
  }

  const handleSignout = () => {
    signout();
  }

  const query = new URLSearchParams(location.search);
  const code = query.get('code');

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          const response = await axios.get(`/api/auth/callback?code=${code}`, {
            withCredentials: true,
          });
          const userData = response.data;
          dispatch(addUser(userData.user));
        } catch (error) {
          console.error('Error during authentication', error);
          toast({
            title: 'Something went wrong',
            variant: 'destructive',
          })
        }
        navigate('/');
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, [location, code, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      })
    }
    if (isSuccess) {
      dispatch(resetState());
    }
    //eslint-disable-next-line
  }, [isError, isSuccess])
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={
              user?.picture ??
              NavImages.user
            }
            alt="Image of the user"
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem asChild>
                <Link to="/create" className="w-full text-start">
                  Airbnb your Home
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/my-properties" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/favorites" className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/reservations" className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link 
                to="/"
                onClick={() => handleSignout()}
                className="w-full">
                  Logout
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <div 
                onClick={() => handleLogin()} 
                className="w-full cursor-pointer">
                  Sign In
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
