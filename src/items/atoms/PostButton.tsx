import { PostData } from "@/scripts/helpers/fetchHelper";
// ReactFunctionComponent
export const PostButton =({
    method = "POST",
    theUrl = "https://ims.jinaron.com/api/v1/units/opts/model_styles/",
    theData = {label:"testlabel999",description:"testdescrip999"},
})=>{
    return(<>
    <button className="_ddb tx-white opaci-hov-50 py-1 px-2 bord-r-5 tx-xs"
        onClick={async ()=>{const res = await PostData(theUrl, theData, method);}
    }>
        Post <br/> Button
    </button>
    </>)
}