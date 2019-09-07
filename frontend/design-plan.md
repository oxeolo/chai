<h1>
Chai Frontend Design Plan
</h1>

## Component Structure

### Rough Overview
1. Logo
2. Books
3. Write
4. Write Title/Icon
5. Inputs
6. Buttons
7. Circles
8. Save Status


### Pages
1. Landing      
2. Login / Register
3. Books
4. Compose


### Containers
1. LoginFormContainer
2. BooksContainer
3. ComposeContainer
4. StatusContainer

### Views
1. SplashLogoView
2. LoginFormView
3. PageLogoView (UI)
4. ComposeTitleView
5. ButtonView (UI)
6. InputView (UI)
7. LinkView (UI)
8. BooksView (Books)
9. BookView (Books)
10. ComposeView
11. StatusView
12. LogoutView

### Actions
1. Select Book
2. Update Book
3. Save Book
4. Close


### Reducers

#### books
{
    store = {
        id: {
            text: string,
            color: string,
            name: string
        }
    }
}