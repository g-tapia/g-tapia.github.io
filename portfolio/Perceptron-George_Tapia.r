# Set working directory as needed
library(ggplot2)

working_directory <- getwd()
set_working_directory <- working_directory

points1 <- read.csv("points-1.csv")
points2 <- read.csv("points-2.csv")
points3 <- read.csv("points-3.csv")

#correctly separates this one. (used for testing)
test_df <- data.frame(label = c(1, 1, -1, -1),
                                bias = rep(1, 4),
                                x1 = c(1, 1, -1, -2),
                                x2 = c(-1, 1, -1, -2))

# The Perceptron function
#
# PARAMETERS:
# points: The dataset that is to be separated
# lamda:  The learning rate
# gamma:  The error threshold
#
# RETURNS
# A list containing three named elements.  The elements
# should be named: 
# "weights" - Contains the final weight vector (learned weights)
# "epochs"  - Number of epochs it took to converge
# "error"   - A vector of error calculated at the end of each epoch

perceptron <- function(points, lamda, gamma) {
# --- Your code goes below ---
  
#side note: intution works as follows:
#weight vector takes on random values as [w1,w2] and we append the bias from column 2 so [w1,w2,bias]
#x vectors takes on [x1,x2] and we append 1 to account for the dot product [x1,x2,1]
  
d.train = points
k <- 0
weights <- c(runif(2, min = -1, max = 1)) #note, will take a while to converge depending on weights
number_of_epochs <- 0
error_history <- c()
n <- nrow(d.train)

repeat{
      
      yi <- c(0)
      y_hat_i <- c(0)
      
      for(i in 1:nrow(d.train)) {
        
        training_instance <- as.numeric(d.train[i, ])
        
        bias <- training_instance[2]
        weights[3] <- bias
        
        x_i <- c(training_instance[3:4], 1)
        y_i <- training_instance[1] 
        
        y_hat <- my_sign(x_i, weights)
        
        if(y_hat != y_i){
          for(w_j in 1:(length(weights)- 1)){
            weights[w_j] <- weights[w_j] + lamda * (y_i - y_hat) * x_i[w_j]  
          }
          
          k <- k + 1
          yi <- append(yi, y_i)
          y_hat_i <- append(y_hat_i, y_hat)
        }
      }
      
      
      number_of_epochs <- number_of_epochs + 1
      error_of_current_epoch <- k / n
      error_history <- append(error_history, error_of_current_epoch)
      


      if( until( sum_i = (abs(sum(yi - y_hat_i)) / n) < gamma ) ){
          break
      }
    k <- 0
  
}


bias <- weights[3]
slope <- -((bias / weights[2]) / (bias / weights[1]))
intercept <-  ( -(bias) / weights[2]   )       

testing_plot <- data.frame(x1 = d.train[, 3], x2 = d.train[, 4], label = d.train[, 1])

plot_1 <- ggplot(testing_plot, aes(x = x1, y = x2)) +
  geom_point(aes(color = as.factor(label)), size = .7, show.legend = T) +
  geom_abline(intercept = intercept, slope = slope) +
  labs(x = "X1", y = "X2", color = "red") +
  ggtitle("Perceptron On The Testing Data Set")

print(plot_1)


error_plot <- data.frame(Epochs = 1:number_of_epochs, Errors = error_history)



x_limit <- if (length(error_history) < 5) 5 else ceiling(length(error_history) / 5) * 5

plot_2 <- ggplot(error_plot, aes(x = Epochs, y = Errors)) +
  geom_line() +
  labs(title = "Perceptron Training Error",
       x = "Epochs",
       y = "Errors") +
  scale_x_continuous(breaks = seq(0, x_limit, by = ifelse(x_limit < 5, 1, 5)), limits = c(0, x_limit)) +
  scale_y_continuous(breaks = seq(0, 1, by = 0.2), limits = c(0, 1)) +
  theme_minimal()

print(plot_2)



return(list(weights, number_of_epochs, error_history))


}

# creating a function to simulate the until expression
until <- function(sum_i) {
   if (sum_i) {
    return(TRUE)
  } else {
    return(FALSE)
  }
}




# The sign function, this is the prediction function
# PARAMETERS:
# x : The X vector (input that needs to be predicted)
# weights: The weight vector
# RETURNS:
# -1 or 1

my_sign <- function(x, weights) {

# --- Your code goes below ---

weighted_sum <- sum(weights * x)

y_hat <- ifelse(weighted_sum > 0, 1, -1)

return(y_hat)
}

# MAIN ENTRY POINT
