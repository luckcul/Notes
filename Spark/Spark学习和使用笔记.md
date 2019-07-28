# Spark学习和使用笔记

本笔记更多记录一些spark学习和使用的心得与备忘。

	> **Apache Spark™** is a unified analytics engine for large-scale data processing.

参考《spark快速大数据分析》这本书，不过这本书是基于spark 1.x版本的，一些新特性（例如`DataFrame`等）是不支持的，所以很多东西的学习不仅局限于这本书。

## spark核心概念

从上层看，每个spark应用都是由`驱动器程序`(driver program)来发起集群的各种操作的，主要的执行操作在executor/worker node运行。

![](https://res.cloudinary.com/dyhtzpcxp/image/upload/v1564307702/Notes/Spark/cluster-overview.png)

一般需要先创建SparkContext对象（2.x版本可以使用SparkSession）。可以通过scala、python、java作为前端进行交互，后端是scala编写运行在JVM之上的。scala进行编写时可以用sbt、Maven进行构建。

## RDD

RDD = Resilient Distributed Dataset，是一个不可变的分布式对象集合。每个RDD有多个分区，运行在多个不同的节点上。

几个重要的概念：

* RDD支持两种操作Transformation 和 action两种操作。
* 惰性计算
* 持久化persist()
* 传递函数

### 转化操作(Transformation)

代码在执行转化操作时，不进行具体的计算，会从已有的RDD派生出新的RDD。

对一个RDD进行操作的函数：`map()`, `flatMap()`, `filter()`, `distinct()`, `sample(withReplacement, fraction, [seed])`

对两个RDD进行操作的函数：`union()`, `intersection()`, `subtract()`, `cartesian()`

### 行动操作(Action)

只有进行行动操作，才会真正的进行数据的实际计算，会将具体的结果返回driver程序。

常用函数：`collect()`, `count()`, `countByValue()`, `take(num)`, `top(num)`, `takerOrdered(num)(ordering)`, `takesample(withReplacement, num, [seed])`, `reduce(func)`, `fold(zero)(func)`, `aggregate(zeroValue)(seqOp, combOp)`, `foreach(func)`

### 惰性计算与持久化

Spark会使用谱系图 lineage graph来记录这些不同RDD操作之间的依赖关系。在调用action操作之前不会进行实际的计算。

持久化会带来很多好处，避免很多冗余的计算。但是同时也会在某些情况下进行了重复的计算，为了应对这个情况，可以在coding的时候手动进行持久化。

持久化存储级别包括[内存、磁盘或结合等多种方式](https://jaceklaskowski.gitbooks.io/mastering-apache-spark/spark-rdd-StorageLevel.html) ，默认方式为内存存储。

持久化有两个相关的函数：[persist()和cache()](https://jaceklaskowski.gitbooks.io/mastering-apache-spark/spark-rdd-caching.html)，`cache()`等于`persist(persist(StorageLevel.MEMORY_ONLY))`

可以使用`unpersist()`进行移除持久化

### 传递函数

python中可以使用lambda表达式，或顶层函数、局部函数。**注意：不用将函数所在对象也序列化，当传递的是某对象的成员或字段的引用时，spark会将整个对象发到worker node**。解决方法是将变量变成局部变量。

使用scala的方式也非常类似，也面临同样传递引用值的问题。注意：**传递局部可序列化的变量或顶级对象中的函数始终是安全的**。

Java是完全面向对象的所以，是要对对象进行继承并实现相应的方法。

各个语言版本的wordcount例子：

```scala
import org.apache.spark._
import org.apache.spark.SparkContext._
object WordCount {
    def main(args: Array[String]) {
      val inputFile = args(0)
      val outputFile = args(1)
      val conf = new SparkConf().setAppName("wordCount")
      // Create a Scala Spark Context.
      val sc = new SparkContext(conf)
      // Load our input data.
      val input =  sc.textFile(inputFile)
      // Split up into words.
      val words = input.flatMap(line => line.split(" "))
      // Transform into word and count.
      val counts = words.map(word => (word, 1)).reduceByKey{case (x, y) => x + y}
      // Save the word count back out to a text file, causing evaluation.
      counts.saveAsTextFile(outputFile)
    }
}
```

```python
from __future__ import print_function
import sys
from operator import add
from pyspark.sql import SparkSession
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: wordcount <file>", file=sys.stderr)
        sys.exit(-1)
    spark = SparkSession\
        .builder\
        .appName("PythonWordCount")\
        .getOrCreate()
    lines = spark.read.text(sys.argv[1]).rdd.map(lambda r: r[0])
    counts = lines.flatMap(lambda x: x.split(' ')) \
                  .map(lambda x: (x, 1)) \
                  .reduceByKey(add)
    output = counts.collect()
    for (word, count) in output:
        print("%s: %i" % (word, count))
    spark.stop()
```

```java
public class WordCount {
  public static void main(String[] args) throws Exception {
    String inputFile = args[0];
    String outputFile = args[1];
    // Create a Java Spark Context.
    SparkConf conf = new SparkConf().setAppName("wordCount");
		JavaSparkContext sc = new JavaSparkContext(conf);
    // Load our input data.
    JavaRDD<String> input = sc.textFile(inputFile);
    // Split up into words.
    JavaRDD<String> words = input.flatMap(
      new FlatMapFunction<String, String>() {
        public Iterable<String> call(String x) {
          return Arrays.asList(x.split(" "));
        }});
    // Transform into word and count.
    JavaPairRDD<String, Integer> counts = words.mapToPair(
      new PairFunction<String, String, Integer>(){
        public Tuple2<String, Integer> call(String x){
          return new Tuple2(x, 1);
        }}).reduceByKey(new Function2<Integer, Integer, Integer>(){
            public Integer call(Integer x, Integer y){ return x + y;}});
    // Save the word count back out to a text file, causing evaluation.
    counts.saveAsTextFile(outputFile);
	}
}
```



## DataFrame

todo ...

## 读取与存储

todo ...

## Machine Learning

todo ...

## Reference

* 《spark快速大数据分析》
* [配套代码](https://github.com/databricks/learning-spark)
* [Spark的driver理解和executor理解](https://blog.csdn.net/qq_21383435/article/details/78653427)