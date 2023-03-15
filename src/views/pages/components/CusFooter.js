export default function CusFooter({ className }) {
    return (
        <div id="footer-widget-box" style={{ background:'#444',position:'relative',padding:'10px 0' }}>
            <div className="footer-widget" style={{width:'1200px', height:'200px',color:'#ccc', margin:'0 auto'}}>
                <aside className="widget">
                    <h3 className="wiget-title"><span className="s-icon">
                        关于本站</span>
                    </h3>
                    <div className="textwidget">
                        菩提道行
                    </div>
                    <div className="clear"></div>
                </aside>
            </div>
        </div>
    )
}