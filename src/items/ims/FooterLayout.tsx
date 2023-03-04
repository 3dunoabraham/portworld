// ReactFunctionComponent
export const FooterLayout = ()=>{
	return (
    <footer className=" pt-8 pb-4 flex-center Q_xs_lg_flex-col ">
        <div className="pb-4 px-5  flex-center Q_xs_sm_flex-col">
          	<span className="ims-tx-faded">ServicePad Customer Support:</span>
          	<a href="mailto:support@servicepad.com">
				<span className="tx-deco ims-tx-primary tx-bold-5 tx-mdl pl-1 ">
					support@servicepad.com
				</span>
			</a>
        </div>
        <div className="pb-4 px-5 opaci-75 tx-md ims-tx-faded">
          	© 2022 ServicePad, Inc. All rights reserved.
        </div>
    </footer>
	)
}