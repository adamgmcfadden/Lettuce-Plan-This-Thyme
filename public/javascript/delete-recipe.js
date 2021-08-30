$(".delete-post-btn").on("click", function () {
    // let id = $(this).siblings(".id").text();

    const response = fetch(`/api/recipes`, {
        method: 'DELETE'    
    });
});

