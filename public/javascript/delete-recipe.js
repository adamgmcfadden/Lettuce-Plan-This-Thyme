$(".delete-post-btn").on("click", function () {
    let title = $(this).siblings(".title").text();
    console.log(title)

    const response = fetch(`/api/recipes/${title}`, {
        method: 'DELETE' 
    });

    document.location.reload();

});

