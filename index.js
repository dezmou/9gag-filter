const main = async () => {
  const categories = []

  const processPosts = () => {
    const posts = document.querySelectorAll("article")
    for (let post of posts) {
      try {
        const title = post.querySelector(".section")
        for (let categorie of categories) {
          if (title.textContent.trim() === categorie.name) {
            // post.style.border = "2px solid red"
            post.style.display = categorie.checked ? "block" : "none"
          }
        }
      } catch (error) {
        // console.log(error)
      }
    }
  }

  const navs = document.querySelectorAll("#container > div.section-sidebar > div > section:nth-child(2) > ul > li")
  let savedCategories = await new Promise(resolve => {
    chrome.runtime.sendMessage({
      action: "getCategories",
    }, function (response) {
      resolve(response)
    });
  })
  for (let nav of navs) {
    const a = nav.querySelector("a")
    a.style["margin-left"] = "20px"
    nav.insertAdjacentHTML("afterbegin", `
        <i class="icon" style="background-image : none; top : 66%"><input type="checkbox" style="transform: scale(1.5);"></i>
    `)
    const name = nav.textContent.trim()
    const check = nav.querySelector("input")
    const saved = savedCategories ? savedCategories.find(el => el.name === name) : null
    check.checked = saved ? saved.checked : true
    const categorie = {
      name,
      checked: saved ? saved.checked : true
    }
    check.onclick = () => {
      categorie.checked = check.checked
      chrome.runtime.sendMessage({
        action: "setCategories",
        categories
      }, function (response) {
        processPosts()
      });
    }
    categories.push(categorie)
  }
  for (let cat of categories){
    cat.checked = true
  }
  if (savedCategories){
    for (let cat of categories) {
      for (let sav of savedCategories) {
        if (cat.name === sav.name) {
          cat.checked = sav.checked
          break;
        }
      }
    }
  }
  processPosts()
  let lastLength = 0;
  while (true) {
    try {
      const posts = document.querySelectorAll("article")
      if (posts.length > lastLength) {
        processPosts()
        lastLength = posts.length
      }
      await new Promise(resolve => setTimeout(resolve, 40))
    } catch (error) {
      // console.log(error)
    }
  }
}

main()