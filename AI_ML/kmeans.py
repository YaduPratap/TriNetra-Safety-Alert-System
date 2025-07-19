# K-Means Clustering

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import csv

# Importing the dataset
dataset = pd.read_csv('D:\PROJECT_AND_CODES\Major_Project\SafeRoute\data\crime.csv')
X = dataset.iloc[:, [1,2,3,4,5,6,7,8,12]].values
print("Dataset iloc py 1,2,3,4,5,6,7,8,12\n",X[0],X[1],X[2], X[3], X[4], X[5], X[6], X[7], X[8], X[12])

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X = sc_X.fit_transform(X)


# Using the elbow method to find the optimal number of clusters
from sklearn.cluster import KMeans
wcss = []
for i in range(1, 21):
    kmeans = KMeans(n_clusters = i, init = 'k-means++', random_state = 42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)
plt.plot(range(1, 21), wcss)
plt.title('The Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('WCSS')
plt.show()

# Fitting K-Means to the dataset
# kmeans = KMeans(n_clusters = 6, init = 'k-means++', random_state = 42)
# Fitting K-Means to the dataset
kmeans = KMeans(n_clusters = 5, init = 'k-means++', random_state = 42)
y_kmeans = kmeans.fit_predict(X)

from sklearn.decomposition import KernelPCA
kpca = KernelPCA(n_components = 2, kernel = 'rbf')
X = kpca.fit_transform(X)


print("\n\nykmean values:\n",y_kmeans)
filename = 'D:\PROJECT_AND_CODES\Major_Project\SafeRoute\data\ymean.txt'
file=open(filename, 'w')
# Saving the y_kmeans array in a text file
content = str(y_kmeans)
content = content.replace('[', '')
content = content.replace(']', '')
file.write(content)
file.close()
 
# Displaying the contents of the text file
file = open(filename, "r")
content = file.read()
 
print("\nContent in filename.txt:\n", content)
file.close()
'''

print("\n\nykmean values:\n",y_kmeans)
filename = 'D:\PROJECT_AND_CODES\Major_Project\SafeRoute\data\ymean.txt'
with open(filename, 'w', newline='') as f:
	# w = csv.DictWriter(f,['theme','url','img','lines','author'])
	f.write(y_kmeans)


'''


# Visualising the clusters
plt.scatter(X[y_kmeans == 0, 0], X[y_kmeans == 0, 1], s = 100, c = 'red')
plt.scatter(X[y_kmeans == 1, 0], X[y_kmeans == 1, 1], s = 100, c = 'blue')
plt.scatter(X[y_kmeans == 2, 0], X[y_kmeans == 2, 1], s = 100, c = 'green')
plt.scatter(X[y_kmeans == 3, 0], X[y_kmeans == 3, 1], s = 100, c = 'cyan')
plt.scatter(X[y_kmeans == 4, 0], X[y_kmeans == 4, 1], s = 100, c = 'magenta' )
plt.scatter(X[y_kmeans == 5, 0], X[y_kmeans == 5, 1], s = 100, c = 'black' )



plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s = 300, c = 'yellow', label = 'Centroids')
plt.title('Clusters of areas')
plt.xlabel('factor1')
plt.ylabel('factor2')
plt.legend()
plt.show()
