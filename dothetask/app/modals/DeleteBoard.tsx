export default function deleteBoard(){
    return (
        <section>
            <div>
                <h1>Delete this board?</h1>
                <p>Are you sure you wanna delete this platform-launch board? This action will permanently delete the board and is not reverseable</p>

                <div>
                    <button>Delete</button>
                    <button>Cancel</button>
                </div>
            </div>
        </section>
    )
}