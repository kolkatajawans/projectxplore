import { Button } from "../ui/ui/button"
export default function Profile_main(){
    return (
        <div
          id="box"
          className=" w-[280px] bottom-0 h-full  py-6"
        >
          <div className="  w-[260px] h-full flex shadow-lg flex-col justify-center items-start ml-4 p-2 px-4">
            
            <div
              id="avatar"
              className="flex justify-center items-center w-full mt-10"
            ><div className="w-[110px] h-[110px] rounded-[50%] border-black border-2"></div></div>
            <div className="w-full text-center text-black pt-4">Parambrata Ghosh</div>
            <div className="w-full text-center mb-8 pt-1">@param.ghos</div>
            <Button className="w-full my-3 ">Edit Profile</Button>
            <Button className="bg-white border-black border-2 text-black w-full">
              Share
            </Button>
            <div className="w-full mt-6 flex flex-col justify-center items-center">
              <div className="w-full flex justify-center">
                <div className="flex justify-start">Followers</div>
                <div className="w-full flex justify-end">32</div>
              </div>
              <div className="w-full flex">
                <div className="flex justify-start">Following</div>
                <div className="w-full flex justify-end">8</div>
              </div>
            </div>
            <div className="flex-shrink">
                <div className="text-[10px]">#TAGS</div>
              <div className="">
                <div className="flex space-x-2  py-[1px]">
                  <Button className="bg-[#e6e6e6] text-black text-[12px] p-1">
                    3D Modeling
                  </Button>
                  <Button className="bg-[#e6e6e6] text-black text-[12px] p-1">
                    Graphic Design
                  </Button>
                </div>
                <div className="flex space-x-2  py-[1px]">
                  <Button className="bg-[#e6e6e6] text-black text-[12px] p-1">
                    3D Render
                  </Button>
                  <Button className="bg-[#e6e6e6] text-black text-[12px] p-1">
                    Game Art
                  </Button>
                </div>
                <div className="flex space-x-2  py-[1px]">
                  <Button className="bg-[#e6e6e6] text-black text-[12px] p-1">
                    Digital Art
                  </Button>
                  <Button className="bg-[#e6e6e6] text-black text-[12px] p-1">
                    Original Charectar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}